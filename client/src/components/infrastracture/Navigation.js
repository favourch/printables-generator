import React, { Component } from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap'

class Navigation extends Component {

	render() {
		return (
	        <Navbar collapseOnSelect id="main-nav">
	          <Navbar.Header>
	            <Navbar.Brand>
	              <a href="#">Design Me</a>
	            </Navbar.Brand>
	            <Navbar.Toggle />
	          </Navbar.Header>
	          <Navbar.Collapse>
	            <Nav>
	              <li><Link to="/" activeClassName="active">Home</Link></li>
	              <li><Link to="/browse" activeClassName="active">Browse designs</Link></li>
	              <li><Link to="/my-designs" activeClassName="active">My designs</Link></li>
	              <li><Link to="/create" activeClassName="active">Create new design</Link></li>
	              <li><Link to="/register" activeClassName="active">Register</Link></li>
	              <li><Link to="/login" activeClassName="active">Login</Link></li>
	            </Nav>
	            <Nav pullRight>
	              <div className="profile-picture"></div>
	              <NavDropdown eventKey={3} title="Jagoda Przybyla" id="basic-nav-dropdown">
	                <MenuItem eventKey={3.1}>My profile</MenuItem>
	                <MenuItem eventKey={3.2}>Settings</MenuItem>
	                <MenuItem divider />
	                <MenuItem eventKey={3.3}>Logout</MenuItem>
	              </NavDropdown>
	            </Nav>
	          </Navbar.Collapse>
	        </Navbar>
		)
	}
}

export default Navigation;
