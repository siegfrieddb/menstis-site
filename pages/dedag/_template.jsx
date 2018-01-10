import React from 'react'
import { Link } from 'react-router'
import Header from 'components/Header'
import find from 'lodash/find'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import access from 'safe-access'
import typography from 'utils/typography'
import include from 'underscore.string/include'
import startsWith from 'lodash/startsWith'
import Breakpoint from 'components/breakpoint'
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
    const pageOptions = []
    // Sort pages.
    const pages = this.props.route.pages
    const childPages = []
    const dropDown = []
    pages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && startsWith(page.path,"/dedag/") ) {
        const title = access(page, 'data.title') || page.path
        const isActive = page.path === this.props.location.pathname
        pageLinks.push(
          <li
            key={page.path}
            style={{
              marginBottom: rhythm(1/4),
            }}
          >
            <Link style={{boxShadow: 'none'}} to={prefixLink(page.path)}>
                    {isActive ? <strong >{title}</strong> : title}
            </Link>
          </li>
        )
        pageOptions.push(
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
        childPages.push(page)
      }
    })
    const docOptions = childPages.map((child) =>
      <option
        key={prefixLink(child.path)}
        value={prefixLink(child.path)}
      >
        {child.data.title}
      </option>

    )
    return (
      <div>

      <div className="ui container" >
        <Breakpoint
          mobile
        >
          
          <div
            style={{
              overflowY: 'auto',
              paddingRight: `calc(${rhythm(1/2)} - 2px)`,
              position: 'absolute',
              width: `calc(${rhythm(10)} - 2px)`,
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
              {pageLinks}
            </ul>
          </div>
          <div
            style={{
              padding: `0 ${rhythm(1)}`,
              paddingLeft: `calc(${rhythm(10)} + ${rhythm(1)})`,
            }}
          >
            {this.props.children}
          </div>
          </Breakpoint>
          <Breakpoint>

          <div style={{ paddingLeft:'15px'}} >
            <Dropdown  defaultValue={this.props.location.pathname} fluid search selection  
                      options={dropDown}  onChange={this.handleDropDown}

            />
           </div>
            <br />
            {this.props.children}
          </Breakpoint>
      </div>
    </div>

    )
  },
})
