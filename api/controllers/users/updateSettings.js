import User from '../../models/user';

const updateSettings = (req, res) => {

	console.log('update settings')
	console.log(req.body)

	const userId = req.user.id;
	console.log('update user', userId)
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const username = req.body.username;
  const bio = req.body.bio;

  // Validate input fields using express validator
  req.checkBody({
    'firstName': { //
      notEmpty: true,
      isLength: {
        options: [{ min: 2, max: 20 }],
        errorMessage: 'First name must be between 2 and 20 characters.' // Error message for the validator, takes precedent over parameter message
      },
      errorMessage: 'First name is required.'
    },
    'username': { //
      notEmpty: true,
      isLength: {
        options: [{ min: 8, max: 100 }],
        errorMessage: 'Username must be minimum 8 characters.' // Error message for the validator, takes precedent over parameter message
      },
      errorMessage: 'Username is required.'
    },
    'email': {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Invalid email.'
      },
      errorMessage: 'Email is required.'
    }
  });

  var errors = req.validationErrors();

  // Save to database if there are no errors
  if (!errors) {

  	var userData = {
  		firstName: firstName,
  		lastName: lastName, 
  		email: email, 
  		username: username,
  		bio: bio
  	}

  	User.findByIdAndUpdate(userId, userData, {}, function(err) {
      console.log(err)
      console.log('user updated', userId)
    })

    // var newUser = new User({
    //      firstName: firstName,
    //      email: email,
    //      username: username,
    //      password: password
    //  });

    // createUser(newUser, function(err, user) {
    //   if (err) throw err;
    //   console.log(user);
    // })
  }

  // Send validation errors in response
  res.send({ 'errors': errors })

}

export default updateSettings;