import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'
import { rhythm } from 'utils/typography'
import access from 'safe-access'
import { config } from 'config'
import include from 'underscore.string/include'
import moment from 'moment'
import startsWith from 'lodash/startsWith'
import { Image } from 'semantic-ui-react'


const style = {
  post: {
    marginBottom: rhythm(1),
    listStyle: 'none'
  },
  Link: {
  },
  date: {
    fontSize: rhythm(1 / 2),
    color: 'gray'
  }
}

class BlogIndex extends React.Component {
  render () {


    const pageLinks = []
    // Sort pages.
    //<Link style={style.Link} to={prefixLink(page.path)}>
    const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
    ).reverse()
    sortedPages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && startsWith(page.path,"/blog/") ) {
        const title = access(page, 'data.title') || page.path
        let link = null
        if (!access(page, 'data.linktext') ){
          link = (<span></span>)
        }
        else{
          link = (<Link target='_blank' style={style.Link} to={prefixLink(
                  (path,linkFile) => {
                    let index = path.lastIndexOf("/")
                    return path.substr(0,index+1) + linkFile 
                  })(page.path, page.data.attachment)}>{access(page, 'data.linktext') || page.path}</Link>)
        }
        if (access(page, 'data.layout') == "post")
        { 
          pageLinks.push(
            <li key={page.path} style={style.post}>
                <div className="parent-blog blog-image ">
                  <div className="child-blog" >
                      {page.data.title}
                  </div>
                </div>
              <div style={style.date}>
                  {moment(page.data.date).calendar()}
              </div>
              <div dangerouslySetInnerHTML={{ __html: page.data.body }} /> 
              { link
              }

                <h1></h1>
            </li>

          )
        }
      }
    })
    return (
    <DocumentTitle title={config.blogTitle}>
      <div>
        <h1></h1>
        <h1>Blog</h1>
        <ul>
          {pageLinks}
        </ul>
      </div>
    </DocumentTitle>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object
}

export default BlogIndex
