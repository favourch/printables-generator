import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		index: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	password: {
		type: String
	},
	email: {
		type: String,
		lowercase: true,
		index: true
	},
	registered: {
		type: Date, 
		default: Date.now
	},
	picture: {
		type: String
	}
})

const User = mongoose.model('user', userSchema);

export default User;

export const createUser = (newUser, callback) => {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

export const getUserByEmail = (email, callback) => {
	var query = {email: email};
	User.findOne(query, callback);
}

export const comparePassword = (password, hash, callback) => {
	bcrypt.compare(password, hash, function(err, isMatch) {
    	if (err) throw err;
    	callback(null, isMatch);
	});
}