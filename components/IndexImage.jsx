import React, { Component } from 'react'
import { prefixLink } from 'gatsby-helpers'
import { Grid, Image } from 'semantic-ui-react'

var IndexImage = React.createClass({
  getInitialState: function(){
    return {hover: false}
  },
  toggleHover: function(){
    this.setState({hover: !this.state.hover})
  },
  onImageClick(e, el) {
    browserHistory.push(prefixLink(this.props.path))
  },
  render: function() {
    var divStyle;
    if (this.state.hover) {
      divStyle = {visible: true}
    } else {
      divStyle = {visible: false}
    }
    return(
      <div>
          <div className="column"> 
                <div className="image-fit">
                    <Image  src={prefixLink(el)  + "front.jpg"} onClick={ (e) => this.onImageClick(e) } 
                         onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}
                        />
                </div>
                <div style={divStyle} >
                    {this.props.title}        
                </div>
            </div>
      </div>
    )
  }
})

IndexImage.propTypes = {
  path: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired 
}


export default IndexImage