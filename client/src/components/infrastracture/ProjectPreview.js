import React from 'react'
import { Link } from 'react-router'

export default class ProjectPreview extends React.Component {

  render() {
    return (

        <div className="design-item">
          <Link to={`/create/${this.props.id}`}>
          <div className="design-image" style={{ backgroundImage: 'url(/img/designs/'+this.props.id+'.jpg)' }}></div>
          <div className="design-details">
            <div className="design-title">{this.props.title}</div>
            <div className="design-description">{this.props.description}</div>
            <div className="design-author">
              <div className="profile-picture"></div>
              <div className="author">
                <div className="name">Jagoda Przybyla</div>
                <div className="rating"><i className="lnr lnr-diamond"></i> 1065</div>
              </div>
            </div>
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