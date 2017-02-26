import React, { Component } from 'react'
import includes from 'underscore.string/include'
import { colors, activeColors } from 'utils/colors'
import typography from 'utils/typography'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { config } from 'config'
import { Image } from 'semantic-ui-react'

const { rhythm, adjustFontSizeTo } = typography

class TestImage extends Component {
  render () {
    return (  
        <div>
            {"A"}
        </div>
    )}
};

TestImage.propTypes = {

}


export default TestImage