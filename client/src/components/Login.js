import React, { Component } from 'react'
import Template from './infrastracture/Template'
import axios from 'axios'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.loginUser = this.loginUser.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(event) {
    var state = this.state
    var value = event.target.value
    state[event.target.name] = value
    this.setState(state)
  }

  loginUser() {

    axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password,
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {

    // Check if the user has been redirected after completed registration
    let newUser = false;
    if (this.props.location.state) {
      newUser = (this.props.location.state.newUser) ? true : false;
    }

    return (
      <Template>
        <div className="login">
          <h1>Login</h1>

          { newUser &&
            <div className="alert alert-success" role="alert">You have been registered. Please log in.</div>
          }

          <form className="login-form">
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.changeValue} />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.changeValue} />
            </div>
            <button type="button" onClick={ this.loginUser } className="form-control btn btn-primary">Login</button>
          </form>
        </div>
      </Template>
    );
  }
}

export default Login;