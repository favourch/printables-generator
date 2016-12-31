import React, { Component } from 'react'
import Template from './infrastracture/Template'
import { loginUser } from './infrastracture/utils'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.login = this.login.bind(this)
    this.checkSubmit = this.checkSubmit.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(event) {
    var state = this.state
    var value = event.target.value
    state[event.target.name] = value
    this.setState(state)
  }

  login() {
    loginUser(this.state.username, this.state.password)
  }

  // send the form if the enter is pressed
  checkSubmit(event) {
    if (event.which === 13 || event.keyCode === 13) {
      loginUser(this.state.username, this.state.password)
    }
  }

  render() {

    // Check if the user has been redirected after completed registration
    let newUser = false;
    if (this.props.location.state) {
      newUser = (this.props.location.state.newUser) ? true : false;
    }

    return (
      <Template backgroundColor="#f9f9f9">
        <div className="white-box">
          <div className="login">
            <h1>Login</h1>

            { newUser &&
              <div className="alert alert-success" role="alert">You have been registered. Please log in.</div>
            }

            <form onKeyPress={ this.checkSubmit } className="login-form">
              <div className="input-group">
                <label>Username</label>
                <input type="text" name="username" className="form-control" placeholder="Username" value={this.state.username} onChange={this.changeValue} />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.changeValue} />
              </div>
              <button type="button" onClick={ this.login } className="form-control btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </Template>
    );
  }
}

export default Login;