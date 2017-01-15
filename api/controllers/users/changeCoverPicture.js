import User from '../../models/user';
import cloudinary from 'cloudinary';

const changeCoverPicture = (req, res) => {

  console.log('upload image userId', req.user._id)
	console.log(req.file)
	cloudinary.uploader.upload(
		req.file.path, 
		function(result) { 
			console.log(result)
			res.sendStatus(200) }, 
	    { public_id: 'users/cover-'+req.user._id })
}

export default changeCoverPicture;