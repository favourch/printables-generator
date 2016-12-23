import React, { Component } from 'react'
import Navigation from './Navigation'

class Template extends Component {

	render() {
		return (
			<div className="App">
				<Navigation />
          <div className="app-content">
    				{ this.props.width !== "full" &&
    					<div className="wrapper">
    						{ this.props.children }
    					</div>
    				}

    				{ this.props.width === "full" &&
    					<div>
    						{ this.props.children }
    					</div>
    				}
          </div>
			</div>
		)
	}

}

export default Template;
