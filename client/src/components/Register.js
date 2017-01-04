import React, { Component } from 'react'
import axios from 'axios'
import { browserHistory } from 'react-router'
import Navigation from './infrastracture/Navigation'

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
      <div>
        <Navigation />

        <div className="website">
          <section className="hero-section">
            <div className="overlay"></div>
            <div className="wrapper">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-6 col-md-offset-3 text-center hero-block">
                      <h1 className="main-heading">Create new account</h1>
                      <p>Sign up and start designing custom labels which you can print or save. Share your projects with other users and gain points and reputation. </p>
                      <div className="standard-form">
                        <div className="input-group">
                          <label>Your username</label>
                          <input type="text" className="form-input" name="username" placeholder="Username" value={this.state.username} onChange={this.changeValue} />
                        </div>
                        <div className="input-group">
                          <label>Your email</label>
                          <input type="email" name="email" className="form-input" placeholder="Email" value={this.state.email} onChange={this.changeValue} />
                        </div>
                        <div className="input-group">
                          <label>First name</label>
                          <input type="text" name="firstName" className="form-input" placeholder="First name" value={this.state.firstName} onChange={this.changeValue} />
                        </div>
                        <div className="input-group">
                          <label>Password</label>
                          <input type="password" name="password" className="form-input" placeholder="Password" value={this.state.password} onChange={this.changeValue} />
                        </div>
                        <div className="input-group">
                          <label>Confirm password</label>
                          <input type="password" name="confirmPassword" className="form-input" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.changeValue} />
                        </div>
                        { this.state.errors !== false &&
                          <div className="errors">
                            <h4>Please fix all the errors.</h4>
                            {this.state.errors.map(error => 
                              <div key={error.param} className="alert alert-danger" role="alert">{error.msg}</div>
                            )}
                          </div>
                        }
                        <button type="button" onClick={ this.registerUser } className="primary-submit">Register</button>
                        <button type="button" className="primary-submit facebook">Sign up with Facebook</button>
                      </div>
                      <div className="more-link">or <a href="#"><strong>find out more</strong></a></div>
                    </div>
                  </div>  
                </div>
              </div>
            </div>

            <div className="shaped-block bottom"></div>
          </section>
        </div>

      </div>
    );
  }
}

export default Register;