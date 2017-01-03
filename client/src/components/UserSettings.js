import React, { Component } from 'react'
import Template from './infrastracture/Template'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { showMessage } from './infrastracture/utils'
import superagent from 'superagent'

class UserSettings extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userId: '',
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      bio: '',
      files: [],
      uploadedFile: ''
    }

    this.changeValue = this.changeValue.bind(this)
    this.onProfileDrop = this.onProfileDrop.bind(this)
    this.onCoverDrop = this.onCoverDrop.bind(this)
    this.uploadProfilePicture = this.uploadProfilePicture.bind(this)
    this.uploadCover = this.uploadCover.bind(this)
    this.saveSettings = this.saveSettings.bind(this)
  }

	componentDidMount() {

		// Get user data from the API
    axios.get('/api/user/currentUser')
      .then(response => {
        console.log('GOT THE CURRENT USER')
        console.log(response)
        this.setState({
            userId: response.data._id,
            username: response.data.username,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName
        })
      })
      .catch(console.error);

	}

  changeValue(event) {
    var state = this.state
    var value = event.target.value
    state[event.target.name] = value
    this.setState(state)
  }

  onProfileDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })
    this.uploadProfilePicture(files[0])
  }

  onCoverDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })
    this.uploadCover(files[0])
  }

  uploadProfilePicture(file) {
    let upload = superagent.post('/api/user/upload-image')
                           .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
    })
  }

  uploadCover(file) {
    let upload = superagent.post('/api/user/upload-cover')
                           .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
    })
  }

  saveSettings() {
    const settings = {
      username: this.state.username, 
      email: this.state.email, 
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      bio: this.state.bio
    }
    axios.post('/api/user/update-settings', settings)
      .then(response => {
        showMessage('success', 'Your settings have been saved.')

      })
      .catch(console.error)
  }

  render() {
    return (
      <Template backgroundColor="#f9f9f9">
        <div className="white-box">
          <h1>Settings</h1>
          <form className="login-form">
            <div className="input-group">
              <label>Username</label>
              <input type="text" name="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.changeValue} />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.changeValue} />
            </div>
            <div className="input-group">
              <label>First name</label>
              <input type="text" name="firstName" className="form-control" placeholder="First name" value={this.state.firstName} onChange={this.changeValue} />
            </div>
            <div className="input-group">
              <label>Last name</label>
              <input type="text" name="lastName" className="form-control" placeholder="Last name" value={this.state.lastName} onChange={this.changeValue} />
            </div>
            <div className="input-group">
              <label>Bio</label>
              <textarea className="form-control" name="bio" value={this.state.bio} onChange={this.changeValue} placeholder="Your profile description" />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="input-group">
                  <label>Profile picture</label>
                  <div className="dropzone-with-preview">
                    {this.state.files && 
                      <div className="dropzone-preview">
                        {this.state.files.map((file) => <img key="1" alt="presentation" src={file.preview} />)}
                      </div>
                    }
                    <Dropzone 
                      onDrop={this.onProfileDrop} 
                      multiple={false}
                      accept="image/*">
                      <div className="dropzone-inside">
                        <h4>Drop files to upload or click to open file manager.</h4>
                        <span className="lnr lnr-cloud-upload"></span>
                      </div>
                    </Dropzone>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group">
                  <label>Cover photo</label>
                  <div className="dropzone-with-preview">
                    {this.state.files && 
                      <div className="dropzone-preview">
                        {this.state.files.map((file) => <img key="1" alt="presentation" src={file.preview} />)}
                      </div>
                    }
                    <Dropzone 
                      onDrop={this.onCoverDrop} 
                      multiple={false}
                      accept="image/*">
                      <div className="dropzone-inside">
                        <h4>Drop files to upload or click to open file manager.</h4>
                        <span className="lnr lnr-cloud-upload"></span>
                      </div>
                    </Dropzone>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" onClick={ this.saveSettings } className="form-control btn btn-primary">Save settings</button>
          </form>
        </div>

      </Template>
    );
  }
}

export default UserSettings;

