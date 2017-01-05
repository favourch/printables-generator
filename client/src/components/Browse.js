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

      <div>
      <div className="website">
        <section className="small-cta browse-header">
          <div className="overlay"></div>
          <div className="wrapper">
            <div className="row">
              <div className="col-md-6 col-md-offset-3 text-center">
                <h2>Browse projects</h2>
                <input type="text" className="form-control browse-search" placeholder="Search for something..." />

                <div className="browse-filters">
                  <div className="tags">
                    <div className="tag">Spice labels</div>
                    <div className="tag">Gift labels</div>
                    <div className="tag">Name labels</div>
                    <div className="tag">Badges</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shaped-block light bottom"></div>
        </section>
      </div>

      <Template backgroundColor="#f9f9f9">

        { this.state.designs.length > 0 &&
          <div>
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
            {this.state.designs.length >= 150 &&
              <div className="load-more text-center">
                <button className="btn btn-white">Load more projects...</button>
              </div>
            }
          </div>
        }

        { this.state.designs.length === 0 &&
          <div className="load-more text-center">
            <p>No projects found.</p>
          </div>
        }

      </Template>
      </div>
    );
  }
}

export default Browse;

