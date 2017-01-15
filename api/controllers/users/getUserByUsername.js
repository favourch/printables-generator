import User from '../../models/user';

const getUserByUsername = (req, res) => {

  const username = req.params.username
	User.findOne({ username: username }, function (err, response) {
	  if (err) return console.error(err);
	  res.send(response)
	})
}

export default getUserByUsername;