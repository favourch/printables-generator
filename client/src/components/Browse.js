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
        console.log(response.data)
			})
			.catch(console.error);

	}

  render() {

    return (
      <Template backgroundColor="#f9f9f9">

        <h2 className="page-title">Browse projects</h2> 

        <div className="browse-filters">
          <div className="tags">
            <div className="tag">Spice labels</div>
            <div className="tag">Gift labels</div>
            <div className="tag">Name labels</div>
            <div className="tag">Badges</div>
          </div>
          <input type="text" className="form-control browse-search" placeholder="Search for something..." />
        </div>

        <div className="design-grid">
          {this.state.designs.map(design => 
            <ProjectPreview 
              key={design._id}
              title={design.title}
              description={design.description}
              author={design.author}
              id={design._id}
              index={this.state.designs.indexOf(design)}
              designsArray={this.state.designs}
              {...design} />
          )}
        </div>

        <div className="load-more text-center">
          <button className="btn btn-white">Load more projects...</button>
        </div>

      </Template>
    );
  }
}

export default Browse;

