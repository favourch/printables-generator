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
import changeCoverPicture from './controllers/users/changeCoverPicture';
import changeProfilePicture from './controllers/users/changeProfilePicture';
import getAllUsers from './controllers/users/getAllUsers';
import getTopUsers from './controllers/users/getTopUsers';
import getUserByUsername from './controllers/users/getUserByUsername';

import saveDesign from './controllers/designs/saveDesign';
import deleteDesign from './controllers/designs/deleteDesign';
import addDownload from './controllers/designs/addDownload';
import getAllDesigns from './controllers/designs/getAllDesigns';
import getDesignById from './controllers/designs/getDesignById';
import getDesignPreviewById from './controllers/designs/getDesignPreviewById';
import getDesignsByKeyword from './controllers/designs/getDesignsByKeyword';
import getDesignsByUser from './controllers/designs/getDesignsByUser';
import getTopDesigns from './controllers/designs/getTopDesigns';

import { comparePassword } from './models/user';

// Connect with mongoDB
mongoose.connect(config.mongoDB, { server: { reconnectTries: 999999 } });

// Setup cloudinary
cloudinary.config({ 
  cloud_name: config.cloudinary.cloud_name, 
  api_key: config.cloudinary.api_key, 
  api_secret: config.cloudinary.api_secret 
});

const router = express.Router();

router.get('/', (req, res) => {
	res.send({ data: [] })
})

// Get all users
router.get('/users', (req, res) => {
	getAllUsers(req, res);
})

// Get top users
router.get('/top-users', (req, res) => {
	getTopUsers(req, res);
})

// Get user by username
router.get('/users/:username', (req, res) => {
	getUserByUsername(req, res);
})

// Create new local strategy with passport
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

// Register new user
router.post('/register', (req, res) => {
  registerUser(req, res);
})

// Log in user using passport
router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    res.send(req.user)
})

// Logout user
router.get('/logout', function(req, res) {
    req.logout()
    res.send(200)
})

// Check if the user is logged in
router.get('/authenticate', function(req, res) {
    if (req.user) {
			res.sendStatus(200)
    }
    else {
    	res.sendStatus(401)
    }
})

// Get authenticated user data
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
	changeProfilePicture(req, res);
})

// Change user cover picture
router.post('/user/upload-cover', upload.single('file'), function (req, res, next) {
	changeCoverPicture(req, res);
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
	getAllDesigns(req, res);
})

// Get all designs by keyword
router.post('/designs-by-keyword', (req, res) => {
	getDesignsByKeyword(req, res);
})

// Get top designs
router.get('/top-designs', (req, res) => {
	getTopDesigns(req, res);
})

// Get designs by user
router.get('/designs/user/:userId', (req, res) => {
	getDesignsByUser(req, res);
})

// Get design by id
router.get('/design/:designId', (req, res) => {
	getDesignById(req, res);
})

// Get design preview by id
router.get('/preview-design/:designId', (req, res) => {
	getDesignPreviewById(req, res);
})



export default router;