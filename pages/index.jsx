import React from 'react'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import access from 'safe-access'
import include from 'underscore.string/include'
import startsWith from 'lodash/startsWith'
import typography from 'utils/typography'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import {browserHistory} from 'react-router';


const { rhythm } = typography

const SomeReactCode = React.createClass({
  statics: {
    metadata () {
      return {
        title: 'Men(s)tis website',
      }
    },
  },

  render () {
    return (
      <div >

        <div style={{height: '50px'}}>
        </div>    
        <div className="parent landing-image" style= {{cursor:"pointer"}} onClick={(e) => browserHistory.push(prefixLink("/missie/"))}>
          <div className="child">  
            <span style={{fontWeight: 'bold'} }>men(<span style={{color: '#f26d80'}}>s</span>)tis</span>
          </div>
        </div>
        <div className="landing-menu">
          <div className="ui fluid container ">
            <div className="ui secondary stackable five item menu">
                <Link 
                  className="item landing-item"
                  to={prefixLink('/dedag/')}
                >    
                 <span className="main-menu-item"> De Dag</span>
                </Link>

                <Link 
                  className="item landing-item"
                  to={prefixLink('/blog/')}
                >    
                  <span className="main-menu-item"> Blog</span>
                </Link>
                  <Link 
                  className="item landing-item"
                  to={prefixLink('/film-focus/')}
                >    
                  <span className="main-menu-item"> FilmFocus</span>
                </Link>
                <Link 
                  className="item landing-item"
                  to={prefixLink('/producties/')}
                >    
                  <span className="main-menu-item"> Producties</span>
                </Link>
                <Link 
                    className="item landing-item"
                    to={prefixLink('/uitgeverij/')}
                  >    
                  <span className="main-menu-item"> Uitgeverij</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      
    );
   },
})


export default SomeReactCode