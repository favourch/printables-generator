import React from 'react'
import cloudinary from 'cloudinary'
import $ from 'jquery'

export default class Label extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: false
    }

    this.selectLabel = this.selectLabel.bind(this)
  }

  selectLabel() {
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {

    const name = this.props.name
    const id = this.props.id
    const design = this.props.design

    if (design.backgroundImage !== "") {
    design.backgroundImage = cloudinary.url(design.backgroundImage, { aspect_ratio: 1, crop: "fill" })
    }

    const textStyles = { fontFamily: design.fontFamily, 
                         fontSize: design.fontSize,
                         letterSpacing: design.letterSpacing,
                         textAlign: design.textAlign,
                         textDecoration: design.textDecoration,
                         fontStyle: design.fontStyle,
                         textTransform: design.textTransform,
                         fontWeight: design.fontWeight,
                         color: design.textColor }

    return (

      <div className="canvas-grid-item">
        <div className="designed-label">
          <div className="label-image"
               onClick={() => { this.selectLabel(); this.props.openLabelPanel(); this.props.selectLabel(id); }}>

              <CustomSVG 
                  id={id}
                  width={design.width}
                  name={name}
                  shape={design.shape}
                  backgroundColor={design.backgroundColor}
                  backgroundImage={design.backgroundImage}
                  borderColor={design.borders[0].borderColor}
                  borderWidth={design.borders[0].borderWidth}
                  borderColor2={design.borders[1].borderColor}
                  borderWidth2={design.borders[1].borderWidth}
                  textColor={design.textColor}
                  textStyles={textStyles}
                  changeText={this.props.changeText}
                /> 

          </div>

        </div>
      </div>

    )
  }
}


export class Shape extends React.Component {

  render() {

    if (this.props.type === 1) {
      return (
        <rect 
          width="100"
          height="100"
          x="0"
          y="0"
          fill={this.props.background}
          stroke={this.props.borderColor}
          strokeWidth={this.props.borderWidth} />
        )
    }

    if (this.props.type === 2) {
      return (
        <circle 
          cx="50" 
          cy="50"
          r="50"
          fill={this.props.background}
          stroke={this.props.borderColor}
          strokeWidth={this.props.borderWidth} />
      )
    }

    if (this.props.type === 3) {
      return (
        <path 
          fill={this.props.background}
          stroke={this.props.borderColor}
          strokeWidth={this.props.borderWidth}
          d="M89.735,77.383L53.847,98.102c-2.381,1.375-5.312,1.375-7.692,0L10.266,77.383
    c-2.381-1.375-3.847-3.914-3.847-6.662V29.28c0-2.749,1.466-5.289,3.847-6.662L46.154,1.897c2.38-1.374,5.312-1.374,7.692,0
    l35.889,20.721c2.38,1.374,3.846,3.914,3.846,6.662v41.44C93.581,73.469,92.115,76.008,89.735,77.383"/>
      )
    }

    if (this.props.type === 4) {
      return (
        <path 
          fill={this.props.background}
          stroke={this.props.borderColor}
          strokeWidth={this.props.borderWidth}
          d="M88.343,34.082c0.098-12.027-14.08-14.115-21.071-12.562c-6.99,1.553-14.804-0.972-17.271-7.944
      c-2.468,6.972-10.281,9.497-17.272,7.944c-6.991-1.553-21.169,0.535-21.07,12.562c0,0-10.768,0.409-10.768,16.094
      c0,15.685,10.768,16.094,10.768,16.094c-0.099,12.027,14.079,14.114,21.07,12.562s14.805,0.972,17.272,7.943
      c2.467-6.972,10.28-9.496,17.271-7.943c6.991,1.553,21.169-0.534,21.071-12.562c0,0,10.767-0.409,10.767-16.094
      C99.109,34.491,88.343,34.082,88.343,34.082z" />
      )
    }

    if (this.props.type === 5) {
      return (
        <polygon 
          fill={this.props.background}
          stroke={this.props.borderColor}
          strokeWidth={this.props.borderWidth}
          strokeLinecap="round"
          points="49.384,6.384 56.54,4.203 62.671,8.489 70.152,8.625 74.659,14.597 81.731,17.038 84.171,24.109 
90.143,28.617 90.279,36.097 94.566,42.228 92.384,49.384 94.566,56.54 90.279,62.672 90.143,70.152 84.171,74.658 81.731,81.73 
74.659,84.172 70.152,90.143 62.671,90.279 56.54,94.565 49.384,92.384 42.229,94.565 36.097,90.279 28.617,90.143 24.109,84.172 
17.038,81.73 14.597,74.658 8.625,70.152 8.489,62.672 4.203,56.54 6.384,49.384 4.203,42.228 8.489,36.097 8.625,28.617 
14.597,24.109 17.038,17.038 24.109,14.597 28.617,8.625 36.097,8.489 42.229,4.203 "/>
      )
    }

    if (this.props.type === 6) {
      return (
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          fill={this.props.background}
          stroke={this.props.borderColor}
          strokeWidth={this.props.borderWidth}
          d="M96.764,50.208c-0.002,3.772,0,7.544-0.002,11.316
  c0,3.235-2.374,6.089-5.165,6.204c-0.578,0.022-1.16,0.058-1.73-0.01c-0.701-0.08-0.823,0.273-0.872,1.015
  c-0.078,1.195-0.168,2.438-0.519,3.548c-0.798,2.53-2.747,3.971-5.062,3.979c-1.976,0.005-3.951-0.016-5.927,0.024
  c-0.345,0.006-0.759,0.154-1.019,0.41c-5.712,5.563-12.281,8.968-19.624,10.177c-11.592,1.91-22.249-0.832-31.609-9.276
  c-1.074-0.968-2.086-1.458-3.425-1.357c-1.393,0.107-2.801-0.059-4.194,0.04c-3.415,0.244-5.825-2.914-5.96-6.585
  c-0.073-1.955-0.087-2.027-1.792-1.94c-3.427,0.183-5.708-2.803-6.053-5.76c-0.038-0.332-0.054-0.669-0.055-1.003
  c-0.003-7.105-0.01-14.21-0.003-21.315c0.002-4.196,2.414-7,6.004-7.026c0.593-0.004,1.355,0.174,1.727-0.179
  c0.303-0.287,0.142-1.241,0.182-1.898c0.201-3.257,1.954-5.753,4.471-6.326c0.41-0.093,0.838-0.101,1.258-0.104
  c1.932-0.01,3.863,0.009,5.794-0.019c0.308-0.004,0.685-0.099,0.909-0.317c6.635-6.479,14.314-9.954,22.907-10.701
  c10.309-0.898,19.711,2.042,28.045,9.29c0.053,0.046,0.116,0.083,0.158,0.141c1.065,1.429,2.418,1.783,3.992,1.637
  c1.346-0.125,2.71,0.031,4.062-0.032c3.324-0.16,5.65,3.038,5.75,6.579c0.004,0.103,0.002,0.207,0.004,0.31
  c0.012,1.64,0.012,1.685,1.462,1.628c1.71-0.067,3.276,0.322,4.55,1.731c1.1,1.217,1.801,2.645,1.748,4.506
  c-0.053,1.884-0.011,3.771-0.011,5.658C96.764,46.437,96.764,48.322,96.764,50.208z"/>
      )
    }    

    else {
      return (
        <rect 
          width="100"
          height="100"
          x="0"
          y="0"
          fill={this.props.background}
          stroke={this.props.borderColor}
          strokeWidth={this.props.borderWidth} />
      )
    }
  }
}


export class CustomSVG extends React.Component {

  componentDidMount() {
    this.addCSSImportant()
  }

  componentDidUpdate(prevProps, prevState) {
    this.addCSSImportant()  
  }

  addCSSImportant() {
    console.log('LOOK FOR ELEMENT')
    var currentColor = $('.inner-label-text').css('color')

    var styles = $('.inner-label-text').attr('style');
    console.log(styles)
    console.log(styles.length)
    var newStyles = styles.slice(0, -23)
    console.log(newStyles)
    newStyles += 'color: '+currentColor+' !important';
    console.log(newStyles);
    $('.inner-label-text').attr('style', newStyles);
    // console.log(currentColor)
    // console.log(this.props.textStyles)

    // var elements = document.getElementsByClassName("inner-label-text");
    // var styles = this.props.textStyles
    // console.log(styles)
    // elements[0].setAttribute( 'style', 'color: '+currentColor+' !important' );  
  }

  render() {

    return (

      <svg 
        id={`label${this.props.id}`} 
        width={`${this.props.width}mm`} 
        height={`${this.props.width}mm`} 
        viewBox="0 0 100 100">

        <defs>
          <pattern id="img1" patternUnits="userSpaceOnUse" width="100" height="100">
            <image 
              xlinkHref={this.props.backgroundImage} 
              x="0" 
              y="0" 
              width="100"
              height="100" />
          </pattern>
        </defs>

        <Shape
          type={this.props.shape} 
          background={this.props.backgroundColor}
          borderColor={this.props.borderColor2}
          borderWidth={this.props.borderWidth2} />

        <Shape
          type={this.props.shape} 
          background={this.props.backgroundImage === "" ? this.props.backgroundColor : "url(#img1)"}
          borderColor={this.props.borderColor}
          borderWidth={this.props.borderWidth} />

        <foreignObject 
          x="0" 
          y="42"
          width="100"
          height="100"
          alignmentBaseline="central">
            <div 
              style={{textAlign: "center"}}
              spellCheck={false}>
                <text 
                  textAnchor="middle" 
                  alignmentBaseline="central"
                  dominantBaseline="middle" 
                  fill={this.props.textColor}
                  style={this.props.textStyles}
                  contentEditable="true"
                  suppressContentEditableWarning
                  onBlur={this.props.changeText.bind(this, this.props.id)}
                  className="inner-label-text" >
                    {this.props.name}
                </text>
            </div>
        </foreignObject>
      
      </svg>

    )
  }
}

