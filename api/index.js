import express from 'express';
import config from '../config.json';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user';
import Design from './models/design';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';

import Bluebird from 'bluebird';
mongoose.Promise = Bluebird.Promise;

import registerUser from './controllers/users/registerUser';
import loginUser from './controllers/users/loginUser';
import saveDesign from './controllers/designs/saveDesign';

import { comparePassword } from './models/user';

// Connect with mongoDB
mongoose.connect(config.mongoDB, { server: { reconnectTries: 999999 } });

const router = express.Router();

router.get('/', (req, res) => {
	res.send({ data: [] })
})


// Get all users
router.get('/users', (req, res) => {
	User.find(function(err, users) {
		res.send(users)
	})
})

// Get user by id
router.get('/users/:username', (req, res) => {
	const username = req.params.username
	User.findOne({ username: username }, function (err, response) {
	  if (err) return console.error(err);
	  res.send(response)
	})
})

// Get logged in user data
router.get('/user/currentUser', (req, res) => {
	if (req.user) {
		res.send(req.user)
	} else {
		res.sendStatus(401)
	}
})

// Register new user
router.post('/register', (req, res) => {
  registerUser(req, res);
})

passport.use(new LocalStrategy(
  function(username, password, done) {
  	User.findOne({ username: username }, function(err, user) {
  		if (err) { 
  			return done(err) 
  		}
  		if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
  		user.comparePassword(password, function(err, isMatch) {
  			if (err) throw err;
	   		if (isMatch) {
	   			return done(null, user);
	   		} else {
	   			return done(null, false, { message: 'Invalid password' });
	   		}
  		})
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/authenticate', function(req, res) {
    if (req.user) {
			res.sendStatus(200)
    }
    else {
    	res.sendStatus(401)
    }
})

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.send(req.user)
})

router.get('/logout', function(req, res) {
    req.logout()
    res.send(200)
})

// Save design
router.post('/design/save', (req, res) => {
  saveDesign(req, res);
})

// Get all designs
router.get('/designs', (req, res) => {
	Design.find(function(err, designs) {
		res.send(designs)
	})
})

// Get designs by user
router.get('/designs/user/:userId', (req, res) => {
	const userId = req.params.userId;
	Design.find({ 'author': userId }, function (err, designs) {
	  if (err) return console.error(err);
	  console.log(designs)
	  res.send(designs)
	})
})

// Get design by id
router.get('/design/:designId', (req, res) => {
	const designId = req.params.designId
	Design.findOne({ _id: designId }, function (err, response) {
	  if (err) return console.error(err);
	  res.send(response)
	})
})

cloudinary.config({ 
  cloud_name: 'bluecreative', 
  api_key: '889448152855992', 
  api_secret: 'jlYMNntJd5Aqe3jOzxlhfo2H0SA' 
});

// Upload image to cloudinary
router.post('/upload-image', (req, res) => {
	console.log('USER', req.user.username, 'is trying to upload image')
	cloudinary.uploader.upload(
		'https://cloudinary.com/images/logo-white.png', 
		function(result) { 
			console.log(result) }, 
        { public_id: "john_doe_1001" });
})

// router.post('/user/change-profile-picture', (req, res) => {
// 	console.log('USER', req.user.username, 'is trying to change profile picture')
// 	console.log('FILES')
// 	const data = req.body
// 	console.log(data)
// 	res.send(data)
// 	// cloudinary.uploader.upload(
// 	// 	'https://cloudinary.com/images/logo-white.png', 
// 	// 	function(result) { 
// 	// 		console.log(result) }, 
//  //        { public_id: "john_doe_1001" });
// })

router.put('/user/change-profile-picture', (req, res) => {
	console.log('USER', req.user.username, 'is trying to change profile picture')
	console.log('REQUEST IS:')
	console.log(req)
	console.log('FILES')
	const data = req.body
	console.log(data)
	res.send(data)
	// cloudinary.uploader.upload(
	// 	'https://cloudinary.com/images/logo-white.png', 
	// 	function(result) { 
	// 		console.log(result) }, 
 //        { public_id: "john_doe_1001" });
})



export default router;