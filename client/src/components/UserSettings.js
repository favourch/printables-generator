import React, { Component } from 'react'
import Template from './infrastracture/Template'
import axios from 'axios'
import Dropzone from 'react-dropzone'

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
      files: []
    }

    this.changeValue = this.changeValue.bind(this)
    this.onDrop = this.onDrop.bind(this)
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

  onDrop(files) {
    console.log('Received files: ', files)

    this.setState({
      files: files
    })

    var data = new FormData()
    data.append('file', files[0])

    axios.post('/api/user/change-profile-picture', data)
      .then(response => {
        console.log('AFTER AXIOS POST')
        console.log(response)
        console.log(response.data)
      })
      .catch(console.error)
  }

  saveSettings() {
    console.log('save settings')
    console.log(this.state.files)
    console.log(this.state.files[0])
    // const settings = {
    //   username: this.state.username, 
    //   email: this.state.email, 
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   bio: this.state.bio
    // }
  }

  render() {
    return (
      <Template backgroundColor="#f9f9f9">

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
            <textarea className="form-control" name="bio" value={this.state.bio} placeholder="Your profile description" />
          </div>
          <div className="input-group">
            <label>Profile picture</label>
            <div className="dropzone-with-preview">
              {this.state.files && 
                <div className="dropzone-preview">
                  {this.state.files.map((file) => <img key="1" alt="presentation" src={file.preview} />)}
                </div>
              }
              <Dropzone onDrop={this.onDrop} multiple={false}>
                <div className="dropzone-inside">
                  <h4>Drop files to upload or click to open file manager.</h4>
                  <span className="lnr lnr-cloud-upload"></span>
                </div>
              </Dropzone>
            </div>
          </div>
          <button type="button" onClick={ this.saveSettings } className="form-control btn btn-primary">Save settings</button>
        </form>

      </Template>
    );
  }
}

export default UserSettings;

