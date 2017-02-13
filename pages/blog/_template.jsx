import React from 'react'
import { Link } from 'react-router'
import { Container } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import { rhythm, scale } from 'utils/typography'
import { config } from 'config'
import  _  from 'lodash'
import access from 'safe-access'
import Header from 'components/Header'

const style = {
  header: {
    marginBottom: rhythm(1.5)
  },
  h1: {
    marginBottom: 0,
    fontSize: scale(1.5).fontSize,
    lineHeight: scale(1.5).lineHeight,
    marginTop: 0
  },
  h2: {
    marginTop: 0,
    textAlign: 'center'
  },
  h3: {
    fontFamily: 'Montserrat, sans-serif',
    marginTop: 0
  },
  img: {
    margin: 0,
    border: 0,
    width: '1em',
    height: '1em',
    verticalAlign: 'middle'
  },
  Link: {
    boxShadow: 'none',
    textDecoration: 'none',
    color: 'inherit'
  },
  Container: {
    maxWidth: rhythm(24),
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
  }
}

class Template extends React.Component {
  render () {
    const { location, children } = this.props
    
      
  

    return (
    
    <div className={'ui text container'}>
      {children}
    </div>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object
}

export default Template