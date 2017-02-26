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
                  De Dag
                </Link>

                <Link 
                  className="item landing-item"
                  to={prefixLink('/blog/')}
                >    
                  Blog
                </Link>
                  <Link 
                  className="item landing-item"
                  to={prefixLink('/film-focus/')}
                >    
                  Film Focus
                </Link>
                <Link 
                  className="item landing-item"
                  to={prefixLink('/producties/')}
                >    
                  Producties
                </Link>
                <Link 
                    className="item landing-item"
                    to={prefixLink('/uitgeverij/')}
                  >    
                  Uitgeverij
                </Link>
              </div>
            </div>
          </div>
        </div>
      
    );
   },
})


export default SomeReactCode