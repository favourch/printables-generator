import express from 'express';
import mongoose from 'mongoose';
import User from './models/user';
import Design from './models/design';

import Bluebird from 'bluebird';
mongoose.Promise = Bluebird.Promise;

import registerUser from './controllers/users/registerUser';
import loginUser from './controllers/users/loginUser';

import saveDesign from './controllers/designs/saveDesign';

// Connect with mongoDB
mongoose.connect('mongodb://designadmin:password@ds163677.mlab.com:63677/design', { server: { reconnectTries: 999999 } });

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
router.get('/user/:userId', (req, res) => {
	const userId = parseInt(req.params.userId);
	Post.find({ entryId: userId }, function (err, response) {
	  if (err) return console.error(err);
	  res.send(response)
	})
})

// Register new user
router.post('/register', (req, res) => {
  registerUser(req, res);
})

// Login user
router.post('/login', (req, res) => {
  loginUser(req, res);
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

// Get design by id
router.get('/design/:designId', (req, res) => {
	const designId = req.params.designId
	Design.findOne({ _id: designId }, function (err, response) {
	  if (err) return console.error(err);
	  res.send(response)
	})
})


export default router;