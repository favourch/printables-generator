import React, { Component } from 'react'
import Navigation from './Navigation'

class Template extends Component {

	render() {
		return (
			<div className="App">
				<Navigation />
          <div className="app-content" style={{backgroundColor: this.props.backgroundColor}}>
            <div id="notifications">
              <div className="alert" role="alert">
                <span className="alert-type">Success!</span> <span className="alert-message">Message</span>
              </div>
            </div>
            { /*
            <div className="app-loader">
              <div className="loader-text"> 
                <span className="lnr lnr-hourglass"></span>
                { this.props.loaderText } 
              </div>
            </div>
            */}

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
