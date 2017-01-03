import React, { Component } from 'react'
import axios from 'axios'
import Template from './infrastracture/Template'
import ProjectPreview from './infrastracture/ProjectPreview'
import { Link } from 'react-router'
import cloudinary from 'cloudinary'

class Home extends Component {

		state = {
			users: [],
      topDesigns: []
		}

		componentDidMount() {

      // Get top users list from the api
      axios.get('/api/top-users')
        .then(response => {
          this.setState({
              users: response.data
          })
        })
        .catch(console.error);        

      // Get designs list from the api
      axios.get('/api/designs')
        .then(response => {
          this.setState({
              topDesigns: response.data
          })
        })
        .catch(console.error);
		}

		render() {
			return (
       <Template backgroundColor="#f9f9f9">

        <h2 className="page-title">Most popular projects</h2> 

        <div className="design-grid">
          {this.state.topDesigns.map(design => 
            <ProjectPreview 
              key={design._id}
              title={design.title}
              description={design.description}
              author={design.author}
              id={design._id}
              index={this.state.topDesigns.indexOf(design)}
              designsArray={this.state.topDesigns}
              {...design} />
          )}
        </div>

        <h2 className="page-title">Top users</h2> 

        <div className="top-users">
          {this.state.users.map((user, index) => 
            <div className="design-author" key={user._id}>
              <div className="rating-position"><span className="hash">#</span>{index+1}</div>
              <Link to={`/users/${user.username}`}>
                <div className="profile-picture" style={{backgroundImage: 'url('+cloudinary.url('users/'+user._id+'.jpg', {width: 100, height: 100, crop: "fill", version: '999'})+')'}}></div>
              </Link>
              <div className="author">
                <Link to={`/users/${user.username}`}>
                  <div className="name">{user.firstName} {user.lastName}</div>
                </Link>
                <Link to={`/users/${user.username}`}>
                  <div className="username">@{user.username}</div>
                </Link>
                <div className="rating"><i className="lnr lnr-diamond"></i> {user.points}</div>
              </div>
            </div>
          )}
        </div>

        
          
      </Template>
			)
		}
}

export default Home;
