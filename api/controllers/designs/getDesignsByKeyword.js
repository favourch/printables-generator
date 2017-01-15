import Design from '../../models/design';
import User from '../../models/user';

const getDesignsByKeyword = (req, res) => {

  var keyword = req.body.keyword
  console.log('keyword')
  console.log(keyword)

  Design.find({ $or: [ { title: `/${keyword}/i` }, { description: `/${keyword}/i` } ] }, 
    'id title description authorId created likes downloads', 
    function(err, designs) {
    var newDesigns = []

    designs.forEach(function(design) {
      var authorId = design.authorId
      User.findOne({ '_id': authorId }, '_id username firstName lastName points', function(err, author) {
        design.author = author
        newDesigns.push(design)

        if (newDesigns.length === designs.length) {
          newDesigns.sort(dynamicSort('-created'))
          res.send(newDesigns)
        }
        else {
          res.send('something went wrogn')
        }
      })
    })
  }).sort({'created': -1})
  // .limit(15)

}

export default getDesignsByKeyword;