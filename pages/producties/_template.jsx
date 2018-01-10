import React from 'react'
import { Link } from 'react-router'
import Breakpoint from 'components/breakpoint'
import find from 'lodash/find'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import access from 'safe-access'
import typography from 'utils/typography'
import include from 'underscore.string/include'
import startsWith from 'lodash/startsWith'
import Header from 'components/Header'
 
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

  render () {
   

    const pageLinks = []
    const pageOptions = []
    // Sort pages.
    const pages = this.props.route.pages
    pages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && startsWith(page.path,"/producties/")  && page.path != "/producties/" ) {
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
                    {isActive ? <strong>{title}</strong> : title}
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
      }
    })
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
              {pageLinks}
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
          <strong>Onderwerpen:</strong>
          {' '}
          <select
            defaultValue={this.props.location.pathname}
            onChange={this.handleTopicChange}
          >
            {pageOptions}
          </select>
          <br />
          <br />
          
        </Breakpoint>
        
      </div>
    )
  },
})
