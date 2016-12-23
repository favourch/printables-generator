import express from 'express';
import mongoose from 'mongoose';
import User from './models/user';

import Bluebird from 'bluebird';
mongoose.Promise = Bluebird.Promise;

import registerUser from './controllers/users/registerUser';
import loginUser from './controllers/users/loginUser';

// Connect with mongoDB
mongoose.connect('mongodb://designadmin:password@ds163677.mlab.com:63677/design');

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


export default router;