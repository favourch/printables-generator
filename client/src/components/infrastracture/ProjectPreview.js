import React from 'react'
import { Link } from 'react-router'
import cloudinary from 'cloudinary'
import { HotKeys } from 'react-hotkeys'
import axios from 'axios'


export default class ProjectPreview extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
      design: this.props,
      array: this.props.designsArray,
      index: this.props.index
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.nextDesign = this.nextDesign.bind(this)
    this.previousDesign = this.previousDesign.bind(this)
    this.likeDesign = this.likeDesign.bind(this)
    this.addDownload = this.addDownload.bind(this)
  }

  openModal() {
    this.setState({
      modalVisible: true
    })
  }

  closeModal() {
    this.setState({
      modalVisible: false
    })
  }

  nextDesign() {
    if (this.state.index < this.state.array.length-1) {
      this.setState({
        design: this.state.array[this.state.index+1],
        index: this.state.index+1
      })
    }
  }

  previousDesign() {
    if (this.state.index > 0) {
      this.setState({
        design: this.state.array[this.state.index-1],
        index: this.state.index-1
      })
    }
  }

  likeDesign() {
    console.log('Like the design', this.state.design._id)

    // Like the design
    // axios.post('/api/designs/')
    //   .then(response => {
    //     console.log(response.data)
    //   })
    //   .catch(console.error);
  }

  addDownload() {
    const design = {
      id: this.state.design._id
    }
    axios.post('/api/design/add-download', design)
      .then(response => {
        console.log(response.data)
      })
      .catch(console.error);
  }

  render() {
    const design = this.state.design
    const dateCreated = design.created.slice(0,16).replace('T', ' ')
    const authorPicture = cloudinary.url('users/'+this.state.design.author._id, {width: 100, height: 100, crop: "fill"})
    const likesNumber = this.state.design.likes.length
    const downloadsNumber = this.state.design.downloads

    const keyMap = {
      'escape': ['esc', 'q'],
      'next': ['right', 'd'],
      'previous': ['left', 'a']
    }

    const handlers = {
      'escape': (event) => {
        this.setState({
          modalVisible: false
        })
      },
      'next': (event) => {
        this.nextDesign()
      },
      'previous': (event) => {
        this.previousDesign()
      }
    }

    return (

      <HotKeys keyMap={keyMap} handlers={handlers} className="design-item">
        <div >
          <div className="design-image" onClick={ this.openModal } style={{ backgroundImage: 'url(/img/designs/'+this.props.id+'.jpg)' }}></div>
          <div className="design-details">
            <Link to={`/preview/${this.props.id}`}><div className="design-title">{this.props.title}</div></Link>
            <div className="design-description">{this.props.description}</div>
            <div className="design-author">
              <Link to={`/users/${this.props.author.username}`}>
                <div className="profile-picture" style={{backgroundImage: 'url('+cloudinary.url('users/'+this.props.author._id, {width: 100, height: 100, crop: "fill"})+'.jpg)'}}></div>
              </Link>
              <div className="author">
                <Link to={`/users/${this.props.author.username}`}>
                  <div className="name">{this.props.author.firstName} {this.props.author.lastName}</div>
                </Link>
                <div className="rating"><i className="lnr lnr-diamond"></i> {this.props.author.points}</div>
              </div>
            </div>
            <div className="design-downloads">
              <div className="likes" onClick={ this.likeDesign }><span className="lnr lnr-heart"></span> {likesNumber} </div>
              <div className="downloads"><span className="lnr lnr-download"></span> {downloadsNumber} </div>
            </div>
          </div>
          { this.state.modalVisible &&
            <div>
              <div className="design-item-modal-bg" onClick={ this.closeModal }></div>
              <div className="design-item-modal">
                { this.state.index >= 1 &&
                  <div className="previous design-nav" onClick={ this.previousDesign }><span className="lnr lnr-chevron-left"></span></div>
                }
                { this.state.index < this.state.array.length-1 &&
                  <div className="next design-nav" onClick={ this.nextDesign }><span className="lnr lnr-chevron-right"></span></div>
                }
                <div className="design-item-modal-content">
                  <div className="design-image-big">
                    <img alt="presentation" src={`/img/designs/${design._id}.jpg`} />
                  </div>
                  <div className="design-modal-details">
                    <div className="design-author">
                      <Link to={`/users/${design.author.username}`}>
                        <div className="profile-picture" style={{backgroundImage: 'url('+authorPicture+'.jpg)'}}></div>
                      </Link>
                      <div className="author">
                        <Link to={`/users/${design.author.username}`}>
                          <div className="name">{design.author.firstName} {design.author.lastName}</div>
                        </Link>
                        <div className="rating"><i className="lnr lnr-diamond"></i> {design.author.points}</div>
                      </div>
                    </div>
                    <div className="date">
                      <span className="lnr lnr-clock"></span> { dateCreated }
                    </div>
                    <Link to={`/preview/${design._id}`}>
                      <div className="design-title">{design.title}</div>
                    </Link>
                    <div className="design-description">{design.description}</div>
                    <div className="design-downloads">
                      <div className="likes" onClick={ this.likeDesign }><span className="lnr lnr-heart"></span> {likesNumber}</div>
                      <div className="downloads"><span className="lnr lnr-download"></span> {downloadsNumber}</div>
                    </div>
                    <div className="design-actions">
                      <a href={`/img/designs/${design._id}.pdf`} target="_blank">
                        <button className="btn btn-primary" onClick={ this.addDownload }><span className="lnr lnr-download"></span> Download</button>
                      </a>
                      <Link to={`/preview/${design._id}`}>
                        <button className="btn btn-primary"><span className="lnr lnr-magic-wand"></span> Customize</button>
                      </Link>
                      { localStorage.userId === design.author._id &&
                        <Link to={`/create/${design._id}`}>
                          <button className="btn btn-primary"><span className="lnr lnr-pencil"></span> Edit</button>
                        </Link>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </HotKeys>
    )
  }
}