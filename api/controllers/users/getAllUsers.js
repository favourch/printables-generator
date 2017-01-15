import User from '../../models/user';

const getAllUsers = (req, res) => {

  User.find(function(err, users) {
		res.send(users)
	})
}

export default getAllUsers;