import User from '../../models/user';

const getTopUsers = (req, res) => {

  User.find(function(err, users) {
		res.send(users)
	}).sort({'points': -1}).limit(6)
}

export default getTopUsers;