import express from 'express';
import config from '../config.json';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/user';
import Design from './models/design';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';
import { dynamicSort } from './utils';
import multer from 'multer';
var upload = multer({ dest: 'uploads/' })

import Bluebird from 'bluebird';
mongoose.Promise = Bluebird.Promise;

import registerUser from './controllers/users/registerUser';
import loginUser from './controllers/users/loginUser';
import updateSettings from './controllers/users/updateSettings';
import saveDesign from './controllers/designs/saveDesign';
import deleteDesign from './controllers/designs/deleteDesign';
import addDownload from './controllers/designs/addDownload';

import { comparePassword } from './models/user';

// Connect with mongoDB
mongoose.connect(config.mongoDB, { server: { reconnectTries: 999999 } });

const router = express.Router();

router.get('/', (req, res) => {
	res.send({ data: [] })
})


cloudinary.config({ 
  cloud_name: 'bluecreative', 
  api_key: '889448152855992', 
  api_secret: 'jlYMNntJd5Aqe3jOzxlhfo2H0SA' 
});

// Get all users
router.get('/users', (req, res) => {
	User.find(function(err, users) {
		res.send(users)
	})
})

// Get all users
router.get('/top-users', (req, res) => {
	User.find(function(err, users) {
		res.send(users)
	}).sort({'points': -1})
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

// Update user settings
router.post('/user/update-settings', (req, res) => {
  updateSettings(req, res);
})

// Change user profile picture
router.post('/user/upload-image', upload.single('file'), function (req, res, next) {
	console.log('upload image userId', req.user._id)
	console.log(req.file)
	cloudinary.uploader.upload(
		req.file.path, 
		function(result) { 
			console.log(result)
			res.sendStatus(200) }, 
	    { public_id: 'users/'+req.user._id })
})

// Change user cover photo
router.post('/user/upload-cover', upload.single('file'), function (req, res, next) {
	console.log('upload image userId', req.user._id)
	console.log(req.file)
	cloudinary.uploader.upload(
		req.file.path, 
		function(result) { 
			console.log(result)
			res.sendStatus(200) }, 
	    { public_id: 'users/cover-'+req.user._id })
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

// Delete design
router.post('/design/delete', (req, res) => {
  deleteDesign(req, res);
})

// Increase downloads
router.post('/design/add-download', (req, res) => {
  addDownload(req, res);
})


// Get all designs with author
router.get('/designs', (req, res) => {

	Design.find({}, 
		'id title description authorId created likes downloads', 
		function(err, designs) {
		var newDesigns = []

		designs.forEach(function(design) {
			var authorId = design.authorId
			User.findOne({ '_id': authorId }, '_id username firstName lastName points', function(err, author) {
				design.author = author
				newDesigns.push(design)

				if (newDesigns.length === designs.length) {
					newDesigns.sort(dynamicSort('-created'))
					res.send(newDesigns)
				}
			})
		})
	}).sort({'created': -1})
	// .limit(15)
})


router.get('/top-designs', (req, res) => {
	Design.find({}, 
		'id title description authorId created likes downloads', 
		function(err, designs) {
		var newDesigns = []

		designs.forEach(function(design) {
			var authorId = design.authorId
			User.findOne({ '_id': authorId }, '_id username firstName lastName points', function(err, author) {
				design.author = author
				newDesigns.push(design)

				if (newDesigns.length === designs.length) {
					newDesigns.sort(dynamicSort('-downloads'))
					res.send(newDesigns)
				}
			})
		})
	}).sort({'downloads': -1}).limit(6)
})

// Get designs by user
router.get('/designs/user/:userId', (req, res) => {
	const userId = req.params.userId;
	Design.find({ 'authorId': userId }, function (err, designs) {
	  if (err) return console.error(err);
	  // console.log(designs)
	  res.send(designs)
	}).sort({'created': -1})
})

// Get design by id
router.get('/design/:designId', (req, res) => {
	const designId = req.params.designId
	console.log('get design by id', designId)
	Design.findOne({ _id: designId }, function (err, response) {
	  if (err) return res.sendStatus(404);
	  res.send(response)
	})
})

// Get design preview by id
router.get('/preview-design/:designId', (req, res) => {
	const designId = req.params.designId
	console.log('get design preview by id', designId)
	Design.findOne({ _id: designId }, function (err, response) {
	  if (err) {
	  	console.log('problem');
	  	return res.sendStatus(404);
	  }
	  console.log('ok')
	  res.send(response)
	})
})



export default router;