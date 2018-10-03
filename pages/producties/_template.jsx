import React from 'react'
import { Link } from 'react-router'
import Breakpoint from 'components/breakpoint'
import find from 'lodash/find'
import _ from 'lodash'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import access from 'safe-access'
import typography from 'utils/typography'
import include from 'underscore.string/include'
import startsWith from 'lodash/startsWith'
import Header from 'components/Header'
import { Dropdown } from 'semantic-ui-react'
const { rhythm } = typography

module.exports = React.createClass({
  propTypes () {
    return {
      route: React.PropTypes.object,
    }
  },
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },
  handleTopicChange (e) {
    return this.context.router.push(e.target.value)
  },
  handleDropDown (e,data) {
    return this.context.router.push(data.value)
  },
  render () {
   

    const pageLinks = []
    const dropDown = []
    const pageOrder = []
    // Sort pages.
    const pages = this.props.route.pages
    var activeCombo = "";
    pages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && startsWith(page.path,"/producties/")  && page.path != "/producties/" ) {
        const title = access(page, 'data.title') || page.path
        const order = access(page, 'data.order')
        const isActive = page.path === this.props.location.pathname
        if (isActive)
        {
          activeCombo =  title;
        }
        pageOrder.push(parseInt(order))
        pageLinks.push(
          <li
            key={page.path}
            style={{
              marginBottom: rhythm(1/4),
            }}
          > 
            <Link style={{boxShadow: 'none'}} to={prefixLink(page.path)}>
                    {isActive ? <strong>{title}</strong> : title}
            </Link>
          </li>
        )
        dropDown.push({ key:page.path, value:page.path, text:title} )
      }
    })
    var zippedPages = _.zip(pageOrder, pageLinks)
    var sortedPages = _.sortBy(zippedPages,function(o) {return o[0]});
    var unzippedPages = _.map(sortedPages, o  => o[1]);
    var zippedCombo = _.zip(pageOrder,dropDown);
    var sortedCombo = _.sortBy(zippedCombo, o => o[0]);
    var unzippedCombo  = _.map(sortedCombo,o => o[1]);
    console.log(unzippedPages.length)
    return (  

      <div className="ui container">
        <Breakpoint
          mobile
        >
        
          <div
            style={{
              overflowY: 'auto',
              paddingRight: `calc(${rhythm(1/2)} - 2px)`,
              position: 'absolute',
              width: `calc(${rhythm(8)} - 2px)`,
              borderRight: '1px solid lightgrey',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                marginLeft: 0,
                marginTop: rhythm(1/2),
              }}
            >
              {unzippedPages}
            </ul>
          </div>
          <div
            style={{
              padding: `0 ${rhythm(1)}`,
              paddingLeft: `calc(${rhythm(8)} + ${rhythm(1)})`,
            }}
          >
            {this.props.children}

          </div>
          
        </Breakpoint>
        <Breakpoint>

        <div style={{ paddingLeft:'15px'}} >
          <Dropdown  defaultValue={activeCombo} fluid search selection  
                    options={unzippedCombo}  onChange={this.handleDropDown}

          />
         </div>
          <br />
          {this.props.children}
        </Breakpoint>
        
      </div>
    )
  },
})
