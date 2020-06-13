import React from 'react'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import {browserHistory} from 'react-router';
import access from 'safe-access'
import include from 'underscore.string/include'
import startsWith from 'lodash/startsWith'
import typography from 'utils/typography'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Header from 'components/Header'
import { Grid, Image } from 'semantic-ui-react'
import '../../../css/main.css'
//import {IndexImage} from 'components/IndexImage'
import {TestImage} from 'components/IndImage'
const { rhythm } = typography

const FilmFocus = React.createClass({
  statics: {
    metadata () {
      return {
        title: 'Men(S)tis',
      }
    },
  },

  

  onImageClick(e, el) {
    console.log(el);
    
    browserHistory.push(el)
  },
  render () {
    var movies = []
    const movieLinks = []
    const movieTitles = []
    const movieImageFile = []
    
    movieLinks.push("https://www.youtube.com/embed/zG_OGGv9NZ0?rel=0;&autoplay=1")
    movieTitles.push("PilgrImage")
    movieImageFile.push("../PilgrImage.jpg")
    
    

    var that = this;        
    var gridMovies = []
    if (movieLinks.length ==0 )
    {
        gridMovies = (<div><h1></h1><p>Van zodra het eerste filmpje beschikbaar is, zal het hier verschijnen</p></div>)
    }
    else{
        var i = 0
        while (movieLinks.length > 0){
            
            var line = movieLinks.splice(0,1);
            line.forEach( (el, idx) => {
            gridMovies.push((  <div className="column">
              {/*with no tv url but just embedded
              
             
            <iframe style={{"border": "none" ,"margin-bottom": "-10px" }} frameborder="0" allowfullscreen width="360" height="200" src= {el+"?hl=en_US&amp;fs=0&amp;rel=0&amp;hd=0&amp;loop=1&amp;showinfo=0&amp;cc_load_policy=0&amp;showsearch=0"} ></iframe>
            <div style={{"paddingTop":"1 el", "font-size": "small"}}>{movieTitles[i]}</div>
              */}
              {
                <div className="image-fit" >
                <a href={el} id={"extimg"+i} >
                  <Image  src={prefixLink(movieImageFile[i])}  />
                  <div className="image-overlay">
                    <div className="image-text">{movieTitles[i]}</div>
                  </div>
                </a>
                </div>
              }

            {/*
            <iframe frameborder="0" allowfullscreen width="350" height="200" src= {el+"?hl=en_US&amp;fs=0&amp;rel=0&amp;hd=0&amp;loop=1&amp;showinfo=0&amp;cc_load_policy=0&amp;showsearch=0"} ></iframe>
            <iframe width="350" height="200" src= {el} frameborder="0" allowfullscreen></iframe>*/}
            {/*
            <iframe width="350" height="200" src="https://gf www.youtube.com/embed/eHkUbYKncCE?modestbranding=1&amp;title=test&amp;rel=0&amp;controls=0&amp;" frameborder="0" allowfullscreen></iframe>           
            <iframe width="350" height="200" src="https://www.youtube.com/embed/eHkUbYKncCE?modestbranding=1&amp;title=test&amp;rel=0&amp;controls=0&amp;" frameborder="0" allowfullscreen></iframe>
            <iframe
                src={el} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                </iframe>
*/}
            </div>))  
            })  
            i += 1
        }
    }
    return (
      <DocumentTitle title={`${FilmFocus.metadata().title} | ${config.siteTitle}`}>
        <div className={'ui container'}>
          <div className={'two column stackable ui grid '}>
              {gridMovies}
          </div>
        </div>
      </DocumentTitle>
    )
  },
})

export default FilmFocus
