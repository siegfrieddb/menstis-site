import React, { Component } from 'react'
import includes from 'underscore.string/include'
import { colors, activeColors } from 'utils/colors'
import { Container, Grid, Span } from 'react-responsive-grid'
import typography from 'utils/typography'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'

const { rhythm, adjustFontSizeTo } = typography

class Header extends Component {
  render () {
    const uitgeverijAct = includes(this.props.location.pathname, '/webshop/')
    const productiesAct = includes(this.props.location.pathname, '/producties/')
    const blogAct = includes(this.props.location.pathname, '/blog/')
    const missieAct = includes(this.props.location.pathname, '/missie/')
    const dedagAct = includes(this.props.location.pathname, '/dedag/')
    const filmfocusAct = includes(this.props.location.pathname, '/film-focus/')

      return (  
        <div>
          <Container
            style={{
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
                    background: dedagAct ? activeColors.bg : colors.bg,
                    color: dedagAct ? activeColors.fg : colors.fg,
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
                    background: blogAct ? activeColors.bg : colors.bg,
                    color: blogAct ? activeColors.fg : colors.fg,
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
                    background: missieAct ? activeColors.bg : colors.bg,
                    color: missieAct ? activeColors.fg : colors.fg,
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
                    background: filmfocusAct ? activeColors.bg : colors.bg,
                    color: filmfocusAct ? activeColors.fg : colors.fg,
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  FilmFocus
                </Link>
                <Link
                  to={prefixLink('/producties/')}
                  style={{
                    background: productiesAct ? activeColors.bg : colors.bg,
                    color: productiesAct ? activeColors.fg : colors.fg,
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
                <Link
                  to={prefixLink('/webshop/')}
                  style={{
                    background: uitgeverijAct ? activeColors.bg : colors.bg,
                    color: uitgeverijAct ? activeColors.fg : colors.fg,
                    textDecoration: 'none',
                    paddingLeft: rhythm(1/2),
                    paddingRight: rhythm(1/2),
                    paddingBottom: rhythm(3/4),
                    marginBottom: rhythm(-1),
                    paddingTop: rhythm(1),
                    marginTop: rhythm(-1),
                  }}
                >
                  Webshop
                </Link>
              </Span>
            </Grid>
          </Container>
        </div>
      )}};

Header.propTypes = {
  location: React.PropTypes.object.isRequired,
}


export default Header