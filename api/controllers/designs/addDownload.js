import Design from '../../models/design';
import User from '../../models/user';

const addDownload = (req, res) => {

    const id = req.body.id
    const userId = (typeof req.user !== 'undefined') ? req.user._id : null
    console.log('User id is', userId)
    let authorId = null

    Design.findOne({ '_id': id }, function (err, design) {
      if (err) return console.error(err);
      console.log('Found the design')
      console.log(design)
      authorId = design.authorId
      if (authorId === userId) {
        console.log('the user is the author')
      } else {
        console.log('user is not the author')
        design.update({ $inc: { downloads: 1 } }, function(err) {
          console.log('updated', err)
        })
        User.findByIdAndUpdate({ '_id': authorId }, { $inc: { points: 5 } }, function (err, user) {
          if (err) return console.error(err);
          console.log('Updated the user', user)
        })
      }
    })

}

export default addDownload;