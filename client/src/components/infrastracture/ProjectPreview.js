import React from 'react'
import { Link } from 'react-router'
import cloudinary from 'cloudinary'
import { HotKeys } from 'react-hotkeys'


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
    this.handleKeyPress = this.handleKeyPress.bind(this)
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

  handleKeyPress(e) {
    console.log('handle key press')
  }

  componentDidMount() {
    console.log('console mounted')
  }

  render() {
    const design = this.state.design
    const authorPicture = cloudinary.url('users/'+this.state.design.author._id, {width: 100, height: 100, crop: "fill"})

    const keyMap = {
      'deleteNode': ['del', 'backspace'],
      'moveUp': ['up', 'w'],
      'escape': ['esc', 'q'],
      'next': ['right', 'd'],
      'previous': ['left', 'a']
    }

    const handlers = {
      'deleteNode': (event) => console.log('Delete node hotkey called!'),
      'moveUp': (event) => console.log('Move up hotkey called!'),
      'escape': (event) => {
        console.log('Close the modal')
        this.setState({
          modalVisible: false
        })
      },
      'next': (event) => {
        console.log('Next design')
        console.log(this.state.array)
        console.log(this.state.index)
        if (this.state.index < this.state.array.length) {
          this.setState({
            design: this.state.array[this.state.index+1],
            index: this.state.index+1
          })
        }
      },
      'previous': (event) => {
        console.log('Previous design')
        console.log(this.state.array)
        console.log(this.state.index)
        if (this.state.index > 0) {
          this.setState({
            design: this.state.array[this.state.index-1],
            index: this.state.index-1
          })
        }
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
                <div className="profile-picture" style={{backgroundImage: 'url('+cloudinary.url('users/'+this.props.author._id, {width: 100, height: 100, crop: "fill"})+')'}}></div>
              </Link>
              <div className="author">
                <Link to={`/users/${this.props.author.username}`}>
                  <div className="name">{this.props.author.firstName} {this.props.author.lastName}</div>
                </Link>
                <div className="rating"><i className="lnr lnr-diamond"></i> 1065</div>
              </div>
            </div>
            <div className="design-downloads">
              <div className="likes"><span className="lnr lnr-heart"></span> 16</div>
              <div className="downloads"><span className="lnr lnr-download"></span> 4</div>
            </div>
          </div>
          { this.state.modalVisible &&
            <div>
              <div className="design-item-modal-bg" onClick={ this.closeModal }></div>
              <div className="design-item-modal">
                <div className="design-item-modal-content">
                  <div className="design-image-big">
                    <img alt="presentation" src={`/img/designs/${design._id}.jpg`} />
                  </div>
                  <div className="design-modal-details">
                    <div className="design-author">
                      <Link to={`/users/${design.author.username}`}>
                        <div className="profile-picture" style={{backgroundImage: 'url('+authorPicture+')'}}></div>
                      </Link>
                      <div className="author">
                        <Link to={`/users/${design.author.username}`}>
                          <div className="name">{design.author.firstName} {design.author.lastName}</div>
                        </Link>
                        <div className="rating"><i className="lnr lnr-diamond"></i> 1065</div>
                      </div>
                    </div>
                    <Link to={`/preview/${design._id}`}>
                      <div className="design-title">{design.title}</div>
                    </Link>
                    <div className="design-description">{design.description}</div>
                    <div className="design-downloads">
                      <div className="likes"><span className="lnr lnr-heart"></span> 16</div>
                      <div className="downloads"><span className="lnr lnr-download"></span> 4</div>
                    </div>
                    <div className="design-actions">
                      <a href={`/img/designs/${design._id}.pdf`} target="_blank">
                        <button className="btn btn-primary"><span className="lnr lnr-download"></span> Download</button>
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