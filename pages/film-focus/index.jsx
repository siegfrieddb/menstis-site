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
import '../../css/main.css'
//import {IndexImage} from 'components/IndexImage'
import {TestImage} from 'components/IndImage'
const { rhythm } = typography

const FilmFocus = React.createClass({
  statics: {
    metadata () {
      return {
        title: 'Some React Code',
      }
    },
  },


  onImageClick(e, el) {
    browserHistory.push(prefixLink(el))
  },
  render () {
    var movies = []
    const pages = this.props.route.pages

    pages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && startsWith(page.path,"/film-focus/") ) {
        movies.push(page)
      }
    })
    var gridMovies = []
    while (movies.length > 0){

        
        var line = movies.splice(0,1);
        line.forEach( (el, idx) => {
          gridMovies.push(( <div className="column"> <div className="image-fit"><Image  src={prefixLink(el.path)  + "front.jpg"} onClick={ (e) => this.onImageClick(e,el.path) } /></div></div>))  
          //gridMovies.push(( <TestImage/> ));
        })
        //var line = movies.splice(0,3);
        
        //var elLine = [] 
        //line.forEach( (el, idx) => {
        //    elLine.push(( <Grid.Column> <div className="image-fit"><Image  src={prefixLink(el)  + "front.jpg"} onClick={ (e) => this.onImageClick(e,el) } /></div></Grid.Column>))  
        //});
        

        //gridMovies.push((<Grid.Row columns={3}> {elLine}</Grid.Row>) )
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
