import React, { Component } from 'react'
import includes from 'underscore.string/include'
import { colors, activeColors } from 'utils/colors'
import typography from 'utils/typography'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import { Image } from 'semantic-ui-react'

const { rhythm, adjustFontSizeTo } = typography

class Header extends Component {
  render () {
    const uitgeverijAct = includes(this.props.location.pathname, '/uitgeverij/')
    const productiesAct = includes(this.props.location.pathname, '/producties/')
    const blogAct = includes(this.props.location.pathname, '/blog/')
    const missieAct = includes(this.props.location.pathname, '/missie/')
    const dedagAct = includes(this.props.location.pathname, '/dedag/')
    const filmfocusAct = includes(this.props.location.pathname, '/film-focus/')

      return (  
        <div>
          <div className="ui fluid container ">
           
            <div className="ui massive stackable menu pointing secondary" > 
              <div className="ui container ">
                <div className='item'  style={{padding: '0px', "margin-right": "20px"} } >
                  <div className="parent-menu blog-image ">
                    <div className="child-menu" >
                      <span style={{fontWeight: 'bold'} }>men(<span style={{color: '#f26d80'}}>S</span>)tis</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={prefixLink('/dedag/')}
                  className={dedagAct ? 'active item' : 'item'}
                >
                  De Dag
                </Link>
                <Link
                  to={prefixLink('/blog/')}
                  className={blogAct ? 'active item' : 'item'}
                >
                  Blog
                </Link>
                <Link
                  to={prefixLink('/missie/')}
                  className={missieAct ? 'active item' : 'item'}
                >
                  Missie
                </Link>

                <Link
                  to={prefixLink('/film-focus/')}
                  className={filmfocusAct ? 'active item' : 'item'}
                >
                  Film Focus
                </Link>
                <Link
                  to={prefixLink('/producties/')}
                  className={productiesAct ? 'active item' : 'item'}
                >
                  Producties
                </Link>
                <Link
                  to={prefixLink('/uitgeverij/')}
                  className={uitgeverijAct ? 'active item' : 'item'}
                >
                  Uitgeverij
                </Link>
                 </div>
          </div>
          </div>
        </div>
      )}};

Header.propTypes = {
  location: React.PropTypes.object.isRequired,
}


export default Header