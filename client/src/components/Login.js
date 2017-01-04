import React, { Component } from 'react'
import Navigation from './infrastracture/Navigation'
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
                      <h1 className="main-heading">Login</h1>
                      <p>Sign in to use label generator. </p>
                      { newUser &&
                        <div className="alert alert-success" role="alert">You have been registered. Please log in.</div>
                      }
                      <form className="standard-form" onKeyPress={ this.checkSubmit }>
                        <div className="input-group">
                          <label>Username</label>
                          <input type="text" className="form-input" name="username" placeholder="Username" value={this.state.username} onChange={this.changeValue} />
                        </div>
                        <div className="input-group">
                          <label>Password</label>
                          <input type="password" name="password" className="form-input" placeholder="Password" value={this.state.password} onChange={this.changeValue} />
                        </div>
                        <button type="button" onClick={ this.login } className="primary-submit">Login</button>
                        <button type="button" className="primary-submit facebook">Login with Facebook</button>
                      </form>
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

export default Login;