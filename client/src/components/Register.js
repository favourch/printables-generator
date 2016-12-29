import React, { Component } from 'react'
import Template from './infrastracture/Template'
import axios from 'axios'
import { browserHistory } from 'react-router'

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: false
    }

    this.registerUser = this.registerUser.bind(this)
    this.changeValue = this.changeValue.bind(this)
  }

  changeValue(event) {
    var state = this.state
    var value = event.target.value
    state[event.target.name] = value
    this.setState(state)
  }

  registerUser() {
    console.log('Register new user')
    console.log(this.state.firstName)

    axios.post('/api/register', {
      firstName: this.state.firstName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    })
    .then(response => {
      console.log(response.data);
      this.setState({
        errors: response.data.errors
      })
      if (response.data.errors === false) {
        // browserHistory.push('/login?newUser=1');
        browserHistory.push({
          pathname: '/login',
          state: { newUser: true }
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <Template>
        <div className="register">
          <h1>Register</h1>

          { this.state.errors !== false &&
            <div className="errors">
              <h4>Please fix all the errors.</h4>
              {this.state.errors.map(error => 
                <div key={error.param} className="alert alert-danger" role="alert">{error.msg}</div>
              )}
            </div>
          }

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
              <label>Password</label>
              <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.changeValue} />
            </div>
            <div className="input-group">
              <label>Confirm password</label>
              <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.changeValue} />
            </div>
            <button type="button" onClick={ this.registerUser } className="form-control btn btn-primary">Register</button>
          </form>
        </div>
      </Template>
    );
  }
}

export default Register;