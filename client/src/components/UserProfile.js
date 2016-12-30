import React, { Component } from 'react'
import Template from './infrastracture/Template'
import { Link } from 'react-router'
import axios from 'axios'
import ProjectPreview from './infrastracture/ProjectPreview'

class UserProfile extends Component {

  state = {
      user: {},
      designs: [],
    }

	componentDidMount() {

    const username = this.props.params.username

		// Get user data from the API
    axios.get('/api/users/'+username)
      .then(response => {
        const author = response.data
        this.setState({
            user: author
        })
        // Get the designs from the API  
        axios.get('/api/designs/user/'+response.data._id)
          .then(response => {
            const designs = response.data
            designs.forEach(function(design) {
              design.author = author
            })
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
              <h2>@{this.state.user.username}</h2>
            	<h1>{this.state.user.firstName} {this.state.user.lastName}</h1>
            </div>
          	<Link to="create"><button type="button" className="btn btn-success">Follow @{this.state.user.username}</button></Link>
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

