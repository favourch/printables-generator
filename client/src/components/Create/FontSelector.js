import React from 'react'

export default class FontSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selected: false,
      dropdownOpen: false
    }

    this.openDropdown = this.openDropdown.bind(this)
  }

  openDropdown() {
  	this.setState({
  		dropdownOpen: true
  	})
  }

  render() {

    return (

			<ul className="font-selector">
				<li onClick={this.openDropdown} style={{fontFamily: 'Roboto'}}>Roboto</li>
				{this.state.dropdownOpen &&
					<div>
				  <li style={{fontFamily: 'Roboto'}}>Roboto</li>
				  <li style={{fontFamily: 'Oswald'}}>Oswald</li>
				  <li style={{fontFamily: 'Playfair Display'}}>Playfair Display</li>
				  <li style={{fontFamily: 'Open Sans'}}>Open Sans</li>
				  </div>
				}
			</ul>

    )
  }
}