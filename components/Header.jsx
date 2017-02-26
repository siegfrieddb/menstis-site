import React, { Component } from 'react'
import includes from 'underscore.string/include'
import { colors, activeColors } from 'utils/colors'
import typography from 'utils/typography'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import { Image } from 'semantic-ui-react'
import Breakpoint from './breakpoint'
import { Dropdown } from 'semantic-ui-react'

const { rhythm, adjustFontSizeTo } = typography

var Header = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },
  handleDropDown(e, data){
    return this.context.router.push(data.value)
  },
  render () {
    const uitgeverijAct = includes(this.props.location.pathname, '/uitgeverij/')
    const productiesAct = includes(this.props.location.pathname, '/producties/')
    const blogAct = includes(this.props.location.pathname, '/blog/')
    const missieAct = includes(this.props.location.pathname, '/missie/')
    const dedagAct = includes(this.props.location.pathname, '/dedag/')
    const filmfocusAct = includes(this.props.location.pathname, '/film-focus/')
    var drop_list = []
    drop_list.push({key:'/dedag/', value:'/dedag/', text:'De Dag' })
    drop_list.push({key:'/blog/', value:'/blog/', text:'Blog' })
    drop_list.push({key:'/missie/', value:'/missie/', text:'Missie' })
    drop_list.push({key:'/film-focus/', value:'/film-focus/', text:'Film Focus' })
    drop_list.push({key:'/producties/', value:'/producties/', text:'Producties' })
    drop_list.push({key:'/uitgeverij/', value:'/uitgeverij/', text:'Uitgeverij' })
    var act_item = ''
    if (dedagAct)
      act_item = '/dedag/'
    if (blogAct)
      act_item = '/blog/'
    if (missieAct)
      act_item = '/missie/'
    if (filmfocusAct)
      act_item = '/film-focus/'
    if (productiesAct)
      act_item = '/producties/'
    if (uitgeverijAct)
      act_item = '/uitgeverij/'


      return (  
        <div>
          <div className="ui fluid container ">
            <Breakpoint mobile>
            <div className="ui massive menu pointing secondary" > 
              <div className="ui container ">
                <div className='item'  style={{padding: '0px', "marginRight": "20px"} } >
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
            </Breakpoint>
            <Breakpoint>
             <div className="parent-blog blog-image " style={{textAlign:"center"}}>
                  <div className="child-blog" >
                      <span style={{fontWeight: 'bold'} }>men(<span style={{color: '#f26d80'}}>S</span>)tis</span>
                  </div>
                </div>
              <div style={{height:'10px'}}>
              </div>
              <Dropdown defaultValue={act_item} fluid search selection  
                      options={drop_list}  onChange={this.handleDropDown}

              />
            </Breakpoint>
          </div>
          <div style={{height: "10px"}}>
          </div>
        </div>
      )}});

Header.propTypes = {
  location: React.PropTypes.object.isRequired,
}


export default Header