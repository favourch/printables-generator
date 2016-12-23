import React from 'react'
import { SketchPicker } from 'react-color'

export default class PopupColorPicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      displayColorPicker: false
    }
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  render() {

    const color = this.props.color

    return (

      <div className="color-picker">
        <div className="color-picker-swatch" onClick={ this.handleClick }>
          <div className="color-picker-color" style={{ backgroundColor: color }} />
        </div>
        { this.state.displayColorPicker ? <div className="color-picker-popover">
          <div className="color-picker-cover" onClick={ this.handleClose }/>
          <SketchPicker color={ color } onChange={ this.props.changeHandler } />
        </div> : null }
      </div> 

    )
  }
}
