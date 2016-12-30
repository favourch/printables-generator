import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { cloudinaryConfig } from 'react-cloudinary'
import cloudinary from 'cloudinary'
import axios from 'axios'
import Browse from './components/Browse'
import Create from './components/Create'
import Preview from './components/Preview'
import PageNotFound from './components/PageNotFound'
import Register from './components/Register'
import Login from './components/Login'
import UserProfile from './components/UserProfile'
import UserSettings from './components/UserSettings'

cloudinaryConfig({ cloud_name: 'bluecreative' });

cloudinary.config({ 
  cloud_name: 'bluecreative', 
  api_key: '889448152855992', 
  api_secret: 'jlYMNntJd5Aqe3jOzxlhfo2H0SA' 
});

const requireAuth = (nextState, replace, callback) => {
  axios.get('/api/authenticate')
  .then(response => {
    callback()
  })
  .catch(error => {
    browserHistory.push('/login')
  })
}

class App extends Component {
  render() {
    return (
      <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path='/' component={ Browse } />
        <Route path='/browse' component={ Browse } />
        <Route path='/preview/:designId' component={ Preview } />
        <Route path='/create' component={ Create } onEnter={ requireAuth }>
          <Route path="/create/:designId" component={ Create } />
        </Route>
        <Route path='/users' component={ UserProfile }>
          <Route path="/users/:username" component={ UserProfile } />
        </Route>
        <Route path='/settings' component={ UserSettings } onEnter={ requireAuth } />
        <Route path='/register' component={ Register } />
        <Route path='/login' component={ Login } />
        <Route path='/404' component={ PageNotFound } />
        <Route path='*' component={ PageNotFound } />
      </Router>
    );
  }
}

export default App;