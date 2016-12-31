import React, { Component } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import { logoutUser } from './utils'
import axios from 'axios'

class Navigation extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      userId: '',
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      bio: ''
    }

  }

	componentDidMount() {

		// Get user data from the API
		axios.get('/api/user/currentUser')
		  .then(response => {
		    console.log('GOT THE CURRENT USER')
		    console.log(response)
		    this.setState({
		    	loggedIn: true,
		        userId: response.data._id,
		        username: response.data.username,
		        email: response.data.email,
		        firstName: response.data.firstName,
		        lastName: response.data.lastName
		    })
		  })
		  .catch(console.error);
	}

	render() {

		const name = (this.state.firstName !== '') ? this.state.firstName : this.state.username

		return (
	        <Navbar collapseOnSelect id="main-nav">
	          <Navbar.Header>
	            <Navbar.Brand>
	              <a href="#">Design Me</a>
	            </Navbar.Brand>
	            <Navbar.Toggle />
	          </Navbar.Header>
	          <Navbar.Collapse>
	          	{ this.state.loggedIn &&
		            <Nav>
		              <li><Link to="/browse" activeClassName="active">Browse projects</Link></li>
		              <li><Link to={`/users/${this.state.username}`} activeClassName="active">My profile</Link></li>
		              <li><Link to="/create" activeClassName="active">Create new project</Link></li>
		            </Nav>
	        	}
	        	{ this.state.loggedIn === false &&
	        		<div>
		        		<Nav>
			              <li><Link to="/browse" activeClassName="active">Browse projects</Link></li>
			              <li><Link to="/create" activeClassName="active">Create new project</Link></li>
			            </Nav>
			            <Nav pullRight>
			              <li><Link to="/register" activeClassName="active">Register</Link></li>
			              <li><Link to="/login" activeClassName="active">Login</Link></li>
			            </Nav>
		            </div>
	        	}
	            { this.state.loggedIn &&
		            <Nav pullRight>
		              <div className="profile-picture"></div>
		              <NavDropdown title={name} id="basic-nav-dropdown">
		                <MenuItem><Link to={`/users/${this.state.username}`}>My profile</Link></MenuItem>
		                <MenuItem><Link to="/settings">Settings</Link></MenuItem>
		                <MenuItem divider />
		                <MenuItem onClick={ () => logoutUser() }>Logout</MenuItem>
		              </NavDropdown>
		            </Nav>
	        	}
	          </Navbar.Collapse>
	        </Navbar>
		)
	}
}

export default Navigation;
