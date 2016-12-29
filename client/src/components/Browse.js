import React, { Component } from 'react'
import Template from './infrastracture/Template'
import axios from 'axios'
import ProjectPreview from './infrastracture/ProjectPreview'

class Browse extends Component {

  state = {
      designs: []
    }

	componentDidMount() {

		// Get designs from the API
		axios.get('/api/designs/')
			.then(response => {
			  this.setState({
			      designs: response.data
			  })
			})
			.catch(console.error);

	}

  render() {
    return (
      <Template backgroundColor="#f9f9f9">

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

export default Browse;

