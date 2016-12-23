import React from 'react'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import { Container, Grid, Span } from 'react-responsive-grid'
import access from 'safe-access'
import include from 'underscore.string/include'
import startsWith from 'lodash/startsWith'
import typography from 'utils/typography'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'



const { rhythm } = typography

const SomeReactCode = React.createClass({
  statics: {
    metadata () {
      return {
        title: 'Some React Code',
      }
    },
  },

  render () {

    var movies = []
    const pages = this.props.route.pages

    pages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && startsWith(page.path,"/film-focus/") ) {
        movies.push(page.path)
      }
    })
    var gridMovies = []
    while (movies.length > 0){
        var line = movies.splice(0,3);
        var elLine = [] 
        line.forEach( (el, idx) => {
            elLine.push((<Link to={prefixLink(el)} > <img src={prefixLink(el)  + "front.jpg"} width='280px'  /> </Link> ))  
        });
        gridMovies.push((<div>{elLine}</div>) )
    }


    
   
    

    return (
      <DocumentTitle title={`${SomeReactCode.metadata().title} | ${config.siteTitle}`}>
        <div>
            {gridMovies}
        </div>
      </DocumentTitle>
    )
  },
})

export default SomeReactCode
