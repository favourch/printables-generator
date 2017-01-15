import Design from '../../models/design';
import User from '../../models/user';
import { dynamicSort } from '../../utils';

const getTopDesigns = (req, res) => {

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

}

export default getTopDesigns;