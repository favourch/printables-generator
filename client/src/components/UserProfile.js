import React, { Component } from 'react'
import Template from './infrastracture/Template'
import { Link } from 'react-router'
import axios from 'axios'
import ProjectPreview from './infrastracture/ProjectPreview'

class UserProfile extends Component {

  state = {
      userId: '',
      username: this.props.params.username,
      firstName: '',
      lastName: '',
      designs: [],
    }

	componentDidMount() {

    const username = this.props.params.username
    console.log('COMPONENT MOUNTED', username)

		// Get user data from the API
    axios.get('/api/users/'+username)
      .then(response => {
        this.setState({
            userId: response.data._id,
            firstName: response.data.firstName,
            lastName: response.data.lastName
        })
        // Get the designs from the API  
        axios.get('/api/designs/user/'+response.data._id)
          .then(response => {
            this.setState({
                designs: response.data
            })
          })
          .catch(console.error);
      })
      .catch(console.error);

    // Upload image
    // axios.post('/api/upload-image')
    //   .then(response => {
    //     console.log('upload image request finished')
    //     console.log(response)
    //   })
    //   .catch(console.error);

	}

  render() {
    return (
      <Template backgroundColor="#f9f9f9">

        <div className="profile-header">
          <div className="profile-header-overlay"></div>
          <div className="profile-header-content">
            <div className="profile-picture"></div>
            <div className="profile-title">
              <h2>@{this.state.username}</h2>
            	<h1>{this.state.firstName} {this.state.lastName}</h1>
            </div>
          	<Link to="create"><button type="button" className="btn btn-success">Follow @{this.state.username}</button></Link>
          </div>
        </div>
        <div className="profile-header-bar">
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Following (20)</a></li>
            <li><a href="#">Followers (20)</a></li>
          </ul>
        </div>

        <div className="design-grid">

          {this.state.designs.map(design => 
            <ProjectPreview 
              key={design._id}
              title={design.title}
              id={design._id}
              {...design} />
          )}

        </div>
      </Template>
    );
  }
}

export default UserProfile;

