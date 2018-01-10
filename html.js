import React from 'react'
import DocumentTitle from 'react-document-title'

import { prefixLink } from 'gatsby-helpers'
import { TypographyStyle, GoogleFont } from 'react-typography'
import typography from './utils/typography'
import { colors } from 'utils/colors'
import site_icon from './favicon.ico'

const BUILD_TIME = new Date().getTime()

module.exports = React.createClass({
  displayName: 'HTML',
  propTypes: {
    body: React.PropTypes.string,
  },
  
  render () {
    const title = DocumentTitle.rewind()

    let css
    let bundle
    if (process.env.NODE_ENV !== 'production') {
          bundle = <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
       css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} /> 
    }
    else{
      bundle = <script src={prefixLink(`/bundle.js?t=${BUILD_TIME}`)} />
       css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} /> 
    }

    const productionBuild = Boolean(this.props.body);
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{title}</title>
          <link rel="shortcut icon" href={prefixLink('./favicon.ico')}/>
          <link rel="icon" type="image/png" sizes="32x32" href={prefixLink('./favicon-32x32.png')}/>
          <link rel="icon" type="image/png" sizes="96x96" href={prefixLink('./favicon-96x96.png')}/>
          <link rel="icon" type="image/png" sizes="16x16" href={prefixLink('.favicon-16x16.png')}/>
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
          {css} 
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"></link>
        </head>
        <body>
        
          <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          
          {bundle}  
          
        </body>
      </html>
    )
  },
})
