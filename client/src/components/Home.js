import React, { Component } from 'react'
import axios from 'axios'
import Template from './infrastracture/Template'

class Home extends Component {

		state = {
			users: [],
		}

		componentDidMount() {

  		// Get users list from the api
  		axios.get('/api/users')
  			.then(response => {
  				this.setState({
  						users: response.data
  				})
  			})
  			.catch(console.error);
		}

		render() {
			return (
				<Template>
  				<h1>Users</h1>
  				<p>Here you can see the full list of blog users.</p>

  				<ul>
  				{this.state.users.map(user => 
  					<li key={user._id}>
  						<h3>{user.firstName}</h3>
  					</li>
  				)}
  				</ul>
		   </Template>
			)
		}
}

export default Home;
