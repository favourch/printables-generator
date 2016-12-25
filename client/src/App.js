import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { cloudinaryConfig } from 'react-cloudinary'
import cloudinary from 'cloudinary'
import Home from './components/Home'
import Browse from './components/Browse'
import Create from './components/Create'
import PageNotFound from './components/PageNotFound'
import Register from './components/Register'
import Login from './components/Login'
import Admin from './components/Admin'
import MyDesigns from './components/MyDesigns'

cloudinaryConfig({ cloud_name: 'bluecreative' });

cloudinary.config({ 
  cloud_name: 'bluecreative', 
  api_key: '889448152855992', 
  api_secret: 'jlYMNntJd5Aqe3jOzxlhfo2H0SA' 
});

localStorage.loggedIn = false;
const loggedIn = localStorage.loggedIn;

const requireAuth = (nextState, replace, callback) => {
  if (loggedIn === 'false') {
    replace('login')
  }
  callback();
}

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={ Home } />
        <Route path="/admin" component={ Admin } onEnter={ requireAuth } />
        <Route path='/browse' component={ Browse } />
        <Route path='/my-designs' component={ MyDesigns } />
        <Route path='/create' component={ Create }>
          <Route path="/create/:designId" component={ Create } />
        </Route>
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='*' component={ PageNotFound } />
      </Router>
    );
  }
}

export default App;