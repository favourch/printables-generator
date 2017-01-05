import React from 'react'
import axios from 'axios'

export default class FontSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedFont: 'Roboto',
      dropdownOpen: false,
      availableFonts: []
    }

    this.openDropdown = this.openDropdown.bind(this)
    this.closeDropdown = this.closeDropdown.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.selectFont = this.selectFont.bind(this)
  }

  componentDidMount() {

    // GET LIST OF GOOGLE FONTS
    axios.get('https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyBCnpPf46kxGMsFE9pQG4Pu2YseRvnjPVE')
      .then(response => {
        var fonts = response.data.items.slice(0,100)
        this.setState({
          availableFonts: fonts
        })
      })
      .catch(console.error);
  }

  openDropdown() {
  	this.setState({
  		dropdownOpen: true
  	})
  }

  closeDropdown() {
    this.setState({
      dropdownOpen: false
    })
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  selectFont(font) {
    console.log('Select font')
    console.log(font)
    this.setState({
      selectedFont: font,
      dropdownOpen: false
    })

    this.props.onFontChange(font)
  }

  render() {

    return (

    <div className="font-selector">

      {
        this.state.availableFonts.map((font) => {
          const fontName = font.family.split(' ').join('+')
          const url = "https://fonts.googleapis.com/css?family="+fontName+"&text="+fontName
          return <link rel="stylesheet" type="text/css" href={url} />
        })
      }

      {this.state.dropdownOpen &&
        <div className="click-outside" onClick={this.closeDropdown}></div>
      }

      <div className="font-input">
        <div className="selected-font" 
             style={{fontFamily: this.state.selectedFont}}
             onClick={this.toggleDropdown} >
             {this.state.selectedFont}
        </div>

        {this.state.dropdownOpen &&
    			<ul>
              {
                this.state.availableFonts.map((font) => {
                  return <li key={font.family}
                             style={{fontFamily: font.family}} 
                             onClick={() => this.selectFont(font.family)} >
                             {font.family}
                         </li>
                })
              }
    			</ul>
        }
      </div>

    </div>

    )
  }
}