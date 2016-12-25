import React from 'react'
import cloudinary from 'cloudinary'

export default class BackgroundImageOption extends React.Component {

  render() {

    const imageId = this.props.imageId

    return (

      <img 
        src={ cloudinary.url(imageId, { width: 70, height: 70, crop: "fill" }) } 
        role="presentation" />

    )
  }
}
