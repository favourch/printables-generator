import User from '../../models/user';
import { createUser } from '../../models/user';


const registerUser = (req, res) => {

    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

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
      'email': {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Invalid email.'
        },
        errorMessage: 'Email is required.'
      },
      'password': {
        notEmpty: true,
        isLength: {
          options: [{ min: 8 }],
          errorMessage: 'Password must be at least 8 characters.' // Error message for the validator, takes precedent over parameter message
        },
        errorMessage: 'Password is required.' // Error message for the parameter
      },
      'confirmPassword': {
        equals: {
          options: [req.body.password],
          errorMessage: 'Passwords do not match.'
        }
      }
    });

    var errors = req.validationErrors();

    // Save to database if there are no errors
    if (!errors) {
      var newUser = new User({
           firstName: firstName,
           email: email,
           password: password
       });

      createUser(newUser, function(err, user) {
        if (err) throw err;
        console.log(user);
      })
    }

    // Send validation errors in response
    res.send({ 'errors': errors })

}

export default registerUser;