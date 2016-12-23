import React from 'react'
import { Link } from 'react-router'
import { Container, Grid, Span } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import includes from 'underscore.string/include'
import { colors, activeColors } from 'utils/colors'

import typography from 'utils/typography'
import { config } from 'config'

// Import styles.
import 'css/main.css'
import 'css/github.css'

const { rhythm, adjustFontSizeTo } = typography

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.object,
    }
  },
  render () {
    const docsActive = true
    const examplesActive = includes(this.props.location.pathname, '/examples/')

    return (
      <div>
        <div
          style={{
            background: colors.bg,
            color: colors.fg,
            marginBottom: rhythm(1.5),
          }}
        >
          <Container
            style={{
              maxWidth: 960,
              paddingLeft: rhythm(3/4),
            }}
          >
            <Grid
              columns={12}
              style={{
                padding: `${rhythm(3/4)} 0`,
              }}
            >
              <Span
                columns={12}
               >
                <Link
                  to={prefixLink('/')}
                  style={{
                    textDecoration: 'none',
                    color: colors.fg,
                    fontSize: adjustFontSizeTo('25.5px').fontSize,
                  }}
                >
                  {config.siteTitle}
                </Link>
              
              
                <Link
                  to={prefixLink('/dedag/')}
                  style={{
                    background: examplesActive ? activeColors.bg : colors.bg,
                    color: examplesActive ? activeColors.fg : colors.fg,
                    textDecoration: 'none',
                    paddingLeft: rhythm(2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  De Dag
                </Link>
                <Link
                  to={prefixLink('/blog/')}
                  style={{
                    background: examplesActive ? activeColors.bg : colors.bg,
                    color: examplesActive ? activeColors.fg : colors.fg,
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  Blog
                </Link>
                <Link
                  to={prefixLink('/missie/')}
                  style={{
                    background: examplesActive ? activeColors.bg : colors.bg,
                    color: examplesActive ? activeColors.fg : colors.fg,
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  Missie
                </Link>

                <Link
                  to={prefixLink('/film-focus/')}
                  style={{
                    background: examplesActive ? activeColors.bg : colors.bg,
                    color: examplesActive ? activeColors.fg : colors.fg,
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  Film Focus
                </Link>
                <Link
                  to={prefixLink('/producties/')}
                  style={{
                    background: !docsActive ? activeColors.bg : colors.bg,
                    color: !docsActive ? activeColors.fg : colors.fg,
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  Producties
                </Link>
              </Span>
            </Grid>
          </Container>
        </div>
        <Container
          style={{
           
            padding: `${rhythm(1)} ${rhythm(3/4)}`,
            paddingTop: 0,
          }}
        >
          {this.props.children}
        </Container>
      </div>
    )
  },
})
