import { exists } from "https://deno.land/std/fs/exists.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import * as yaml from "https://deno.land/std/encoding/yaml.ts";
import { Marked } from "https://deno.land/x/markdown/mod.ts";
import {Template} from "./template.ts"
const fs = { exists, ensureDir };

const srcFolder = "./src";
const buildFolder = "./build";

var encoder = new TextEncoder();
var decoder = new TextDecoder();

interface SrcEntry {
  path: string;
}

interface DestEntry {
  path: string;
  content: string;
}




/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any): any {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

async function addDefaultYaml(ymlStart: any, input: GenInput, dirPath: string) {
  let curDir : string | null = path.dirname(dirPath)
  let recYaml = [ymlStart]
  while (curDir) {
    try {
      let extraYml = path.join(curDir, "default.yml")
      let ymlInfo =  yaml.parse(decoder.decode( await input.readFile(extraYml)))
      recYaml.push(ymlInfo)
      
    } catch (er) {
      //ignore TODO: we need stat 
      //console.log(er)
    }
    if (curDir === ".") {
      curDir = null
    } else {
      curDir = path.dirname(curDir)
    }
  }
  recYaml.reverse()
  let yamlContent = {}
  for(const ymlCt of recYaml) {
    yamlContent = mergeDeep(yamlContent,ymlCt)
  }
  return yamlContent
}

const jsFileProxy = {
  get: function (target: any, property: any): any { //do not understand this conditional type shit yet, i would like to have string | Symbol
    if (typeof property === 'symbol') {
      return target[property];
    }
    if (property === "@path" || property === "@input") {
      return target[property]
    }
    var newPath = path.join(target['@path'], property)
    return asJs(target['@input'], newPath)
  }
}



function contentOf(fileAsJs: any): string {
  return fileAsJs[Symbol.toPrimitive]('string')
}

// later support iteration
class AsJsObj {
  readonly "@input": GenInput
  readonly "@path": string
  constructor(input: GenInput, path: string) {
    this["@input"] = input
    this["@path"] = path
  }
  [Symbol.toPrimitive] (hint: string) {
    var filePath = this["@path"].split('\\')
    if (filePath.length > 1) {
      const fileName = filePath[filePath.length -2] + "." + filePath[filePath.length -1]
      filePath.pop()
      filePath[filePath.length-1] = fileName
    }
    const fPath = filePath.join('\\')
    let content = null
    try {
      content = this["@input"].readFileSync(fPath)
    }
    catch(er) {
      throw new Error(`Can not read file ${fPath}: ${er.message}`)
    }
    return decoder.decode(content)
  }
}

function asJs(input: GenInput, path: string=".") {
  return new Proxy(new AsJsObj(input, path), jsFileProxy)
}

//we could allow it to access the full source
interface RenderType {
  selector(entry: SrcEntry): boolean;
  render(input: GenInput, output: GenOutput, entry: SrcEntry): Promise<void>;
}

class MarkdownRender implements RenderType {
  selector(entry: SrcEntry): boolean {
    if (path.extname(entry.path) === ".md") {
      return true;
    }
    return false;
  }

  async render(
    input: GenInput,
    output: GenOutput,
    entry: SrcEntry,
  ): Promise<void> {
    //strip header
    let markdownFc = decoder.decode(
      await input.readFile(entry.path),
    );
    let yamlContent: any = null 
    yamlContent = { template: "" };
    try {
      
      let yamlBegin = markdownFc.indexOf("---");
      if (yamlBegin !== -1) {
        let yamlEnd = markdownFc.indexOf("---", yamlBegin + 1);
        if (yamlEnd === -1) {
          throw new Error("yaml begin marker --- not matched");
        }
        let yamlRaw = markdownFc.substring(yamlBegin + 3, yamlEnd)
        yamlContent = yaml.parse(yamlRaw);

        markdownFc = markdownFc.substring(yamlEnd);
      }
    } catch (er) {
      throw new Error(`Failed to read yaml header of file ${entry.path} (error: ${er.message})`)
    }
    yamlContent = await addDefaultYaml(yamlContent, input, entry.path)
      


    // parse markdown
    let markup = Marked.parse(markdownFc);

    if (yamlContent && yamlContent.title) {
      markup = `<h1>${yamlContent.title}</h1>` + markup
    }
    // check what template to apply
    let template =  yamlContent ? yamlContent.template : null;
    let curDir = path.dirname(entry.path);
    let templStr = "";
    if (template) {
      templStr = decoder.decode(await input.readFile(template));
    }
    while (!templStr && curDir != ".") {
      try {
        template = path.join(curDir, "default.tt")
        templStr = decoder.decode( await input.readFile(template))
      } catch (er) {
        //ignore TODO: we need stat 
        //console.log(er)
      }
      curDir = path.dirname(curDir); 
    }
    if (!templStr) {
      throw new Error(`can not find a single template, provide a default.tt in one of the parent directory of file ${entry.path}`)
    }
    var templ = new Template(templStr);
    var renderedOut = null
    try {
      renderedOut = templ.render({ content: markup, static: asJs(input,"./static") , ...yamlContent});
    }
    catch(er) {
      throw new Error(`Could not render template ${template}: ${er.message}`)
    }
    
    let outPath = entry.path.slice(0, -2) + "html";
    await output.WriteFile(outPath, encoder.encode(renderedOut));
  }
}

class JsonRender implements RenderType {
  selector(entry: SrcEntry): boolean {
    return path.extname(entry.path) === ".json";
  }

  async render(
    input: GenInput,
    output: GenOutput,
    entry: SrcEntry,
  ): Promise<void> {
    let json = null
    try {
      json = JSON.parse(decoder.decode(await input.readFile(entry.path)));
    }
    catch (er) {
      throw new Error(`Error in file: ${entry.path}, message: ${er.message}`)
    }
    if (json.template) {
      //we need to do template things
      try {
        let templStr = decoder.decode(await input.readFile(json.template));
        var templ = new Template(templStr);
        var content = "";
        if (json.source === "film-focus") {
          content = await this.renderFilmFocus(input);
        } else if (json.source === "webshop") {
          content = await this.renderWebshop(input);
        }

        //
        let curDir
        let ymlContent = await addDefaultYaml(json, input, entry.path)

        var renderedOut = templ.render({ content: content, static: asJs(input,"./static"), ...ymlContent });
        let outPath = entry.path.slice(0, -4) + "html";
        await output.WriteFile(outPath, encoder.encode(renderedOut));
      } catch (er) {
        throw new Error(`Could not isntantiate template ${json.template} for file ${entry.path} (reason: ${er.message})`)
      }
      
    }
  }

  async renderFilmFocus(input: GenInput) {
    function getFilm(film: string, title: string) {
      return `
      <div class="column">
        <div class="image-fit" onclick="window.location.href = '/film-focus/${film}/' ">
          <img class="ui image" src="/film-focus/${film}/front.jpg" />
          <div class="image-overlay" >
            <div class="image-text" >${title}</div>
          </div>
        </div>
      </div>`;
    }

    let content = "";
    for await (let entry of input.readDir("film-focus")) {

      let mdfilePath = `/film-focus/${entry.path}/index.md`

      let markdownFc = decoder.decode(
        await input.readFile(mdfilePath),
      );
      let yamlContent: any = null 
      yamlContent = { template: "" };
      try {
        
        let yamlBegin = markdownFc.indexOf("---");
        if (yamlBegin !== -1) {
          let yamlEnd = markdownFc.indexOf("---", yamlBegin + 1);
          if (yamlEnd === -1) {
            throw new Error("yaml begin marker --- not matched");
          }
          let yamlRaw = markdownFc.substring(yamlBegin + 3, yamlEnd)
          yamlContent = yaml.parse(yamlRaw);
  
          markdownFc = markdownFc.substring(yamlEnd);
        }
      } catch (er) {
        throw new Error(`Failed to read yaml header of file ${entry.path} (error: ${er.message})`)
      }
      yamlContent = await addDefaultYaml(yamlContent, input, entry.path)


      content += getFilm(entry.path,yamlContent.title);
    }
    return content;
  }
  async renderWebshop(input: GenInput) {
    function getArticle(article: string) {
      return `
      <div class="column">
        <div class="image-fit" onclick="window.location.href = '/webshop/${article}/' ">
          <img class="ui image" src="/webshop/${article}/front.jpg" />
        </div>
      </div>`;
    }

    let content = "";
    for await (let entry of input.readDir("webshop")) {
      content += getArticle(entry.path);
    }
    return content;
  }
}

class CopyRender implements RenderType {
  includedExt: string[] = [];
  constructor(extToCopy: string[]) {
    this.includedExt = extToCopy;
  }
  selector(entry: SrcEntry): boolean {
    if (this.includedExt.indexOf(path.extname(entry.path)) !== -1) {
      return true;
    }
    return false;
  }

  async render(
    input: GenInput,
    output: GenOutput,
    entry: SrcEntry,
  ): Promise<void> {
    let content = await input.readFile(entry.path);
    await output.WriteFile(entry.path, content);
  }
}

class GenInput {
  basePath: string;
  constructor(inputPath: string) {
    this.basePath = inputPath;
  }

  async readFile(filePath: string) {
    //cool checks if relative path is not breaking out of root
    var fullPath = path.join(this.basePath, filePath);
    return Deno.readFile(fullPath);
  }
  readFileSync(filePath: string) {
    //cool checks if relative path is not breaking out of root
    var fullPath = path.join(this.basePath, filePath);
    return Deno.readFileSync(fullPath)
  }

  async *readDir(dirPath: string): AsyncIterable<SrcEntry> {
    for await (
      const dirEntry of Deno.readDir(path.join(this.basePath, dirPath))
    ) {
      if (dirEntry.isDirectory) {
        yield { path: dirEntry.name };
      }
    }
  }

  async visitFiles(visitor: (entry: SrcEntry) => Promise<void>): Promise<void> {
    await visitFiles(this.basePath, "", visitor);
  }
}

async function visitFiles(
  baseDir: string,
  subDir: string,
  visitor: (entry: SrcEntry) => Promise<void>,
) {
  var dirToCheck = path.join(baseDir, subDir);
  for await (const dirEntry of Deno.readDir(dirToCheck)) {
    if (dirEntry.isDirectory) {
      await visitFiles(baseDir, path.join(subDir, dirEntry.name), visitor);
    } else if (dirEntry.isFile) {
      await visitor({ path: path.join(subDir, dirEntry.name) });
    }
  }
}

class GenOutput {
  basePath: string = ".";
  constructor(iPath: string) {
    this.basePath = iPath;
  }

  async WriteFile(filePath: string, data: Uint8Array) {
    //cool checks if relative path is not breaking out of root
    //cool check if we do not override exising file
    var fullPath = path.join(this.basePath, filePath);

    await fs.ensureDir(path.dirname(fullPath));
    return Deno.writeFile(fullPath, data);
  }
}

async function transformWithFilters(
  input: GenInput,
  output: GenOutput,
  filters: RenderType[],
): Promise<void> {
  let results: DestEntry[] = [];
  await input.visitFiles(async (entry) => {
    //if (entry.path === 'missie\\index.md') {
      for (let filter of filters) {
        if (filter.selector({ path: entry.path })) {
          await filter.render(input, output, { path: entry.path });
        }
      }
    //}
  });
}


// clean up
if (await fs.exists(buildFolder)) {
  await Deno.remove(buildFolder, { recursive: true });
}

//combine all render types
let renderTypes: RenderType[] = [
  new MarkdownRender(),
  new CopyRender([".jpg", ".html",".pdf",".mp3", ".m4v",".js"]),
  new JsonRender(),
];

// scan files old style
//await copySrc(srcFolder, buildFolder);
//let files: SrcEntry[] = [];
//await scanfiles(srcFolder, "", files);

//first stage
await transformWithFilters(
  new GenInput(srcFolder),
  new GenOutput(buildFolder),
  renderTypes
);
console.log(
    "done"
)
Deno.exit()