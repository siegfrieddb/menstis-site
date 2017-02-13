import React from 'react'
import { Link } from 'react-router'
import { Container, Grid, Span } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import Header from 'components/Header'
import typography from 'utils/typography'
import { config } from 'config'

// Import styles.
import 'css/main.css'

const { rhythm, adjustFontSizeTo } = typography

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.object,
    }
  },
  render () {
    if (this.props.location.pathname == prefixLink('/'))
      return (
          <div>
            {this.props.children}
          </div>
      )
    else
      return (
        <div>
          <Header location={this.props.location}/>
          <div>
            {this.props.children}
          </div>
        </div>
      )
  },
})
