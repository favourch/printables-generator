import $ from 'jquery'
import axios from 'axios'
import { browserHistory } from 'react-router'

export function showMessage(type, message) {
	$('#notifications .alert').addClass('alert-'+type)
	type += '!';
	$('#notifications .alert-type').text(type);
	$('#notifications .alert-message').text(message);
	$('#notifications').fadeIn();
	$('#notifications').on('click', function() {
		$(this).fadeOut();
	})
}

export function loginUser(username, password) {
    axios.post('/api/login', {
      username: username,
      password: password,
    })
    .then(response => {
      if (response.status === 200) {
        console.log(response)
        const username = response.data.username
        localStorage.userId = response.data._id
        browserHistory.push({
          pathname: '/users/'+username
        })
      }
    })
    .catch(error => {
      console.log('ERROR', error.response.status)
      if (error.response.status === 400) {
        showMessage('error', 'Please insert username and password.')
      }
      else if (error.response.status === 401) {
        showMessage('error', 'Wrong username or password.')
      }
    })
}

export function logoutUser() {
    axios.get('/api/logout')
    .then(response => {
      console.log(response)
      browserHistory.push('/login')
      localStorage.userId = null
    })
    .catch(error => {
      console.log(error)
      browserHistory.push('/login')
      localStorage.userId = null
    })
}
