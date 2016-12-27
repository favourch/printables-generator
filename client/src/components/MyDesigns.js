import React, { Component } from 'react'
import Template from './infrastracture/Template'
import { Link } from 'react-router'
import axios from 'axios'

class MyDesigns extends Component {

  state = {
      designs: [],
    }

	componentDidMount() {

		// Get users list from the api
		axios.get('/api/designs')
			.then(response => {
				this.setState({
						designs: response.data
				})
			})
			.catch(console.error);
	}

  render() {
    return (
      <Template>
      	<h1>My Designs</h1>
      	<Link to="create"><button type="button" className="btn btn-success">Create new design</button></Link>

        <div className="design-grid">

          {this.state.designs.map(design => 
            <DesignPreview 
              key={design._id}
              title={design.title}
              id={design._id} />
          )}

        </div>
      </Template>
    );
  }
}

export default MyDesigns;


export class DesignPreview extends React.Component {

  render() {
    return (

        <div className="design-item">
          <Link to={`/create/${this.props.id}`}>
          <div className="design-image" style={{ backgroundImage: 'url(/img/designs/'+this.props.id+'.jpg)' }}></div>
          <div className="design-details">
            <div className="design-title">{this.props.title}</div>
            <div className="design-author">Jagoda Przybyla</div>
            <div className="design-downloads">
              <div className="likes"><span className="lnr lnr-heart"></span> 16</div>
              <div className="downloads"><span className="lnr lnr-download"></span> 4</div>
            </div>
          </div>
          </Link>
        </div>

    )
  }
}