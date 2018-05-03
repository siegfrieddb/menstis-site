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
    browserHistory.push(prefixLink(el))
  },
  render () {
    var movies = []
    const movieLinks = []
    
    
    //movieLinks.push("https://www.youtube.com/embed/eHkUbYKncCE?rel=0")
    
    


    var gridMovies = []
    if (movieLinks.length ==0 )
    {
        gridMovies = (<div><h1></h1><p>Van zodra het eerste filmpje beschikbaar is, zal het hier verschijnen</p></div>)
    }
    else{
        while (movieLinks.length > 0){
            
            var line = movieLinks.splice(0,1);
            line.forEach( (el, idx) => {
            gridMovies.push((               
            <div className="column"> 
            <iframe
                src={el} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
                </iframe>

            </div>))  
            })
        }
    }
    return (
      <DocumentTitle title={`${FilmFocus.metadata().title} | ${config.siteTitle}`}>
        <div className={'ui container'}>
          <div className={'three column stackable ui grid '}>
              {gridMovies}
          </div>
        </div>
      </DocumentTitle>
    )
  },
})

export default FilmFocus
