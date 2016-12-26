import Design from '../../models/design';
import ObjectId from 'mongodb'

const saveDesign = (req, res) => {

    const id = req.body._id
    console.log(req.body)

    // UPDATE IF HAS AN ID
    if (typeof id !== "undefined") {
      Design.findByIdAndUpdate(id, req.body, {}, function(err) {
        console.log(err)
      })
    }

    // INSERT IF DOESN'T HAVE AN ID
    else {
      const newDesign = new Design(req.body)
      newDesign.save(function(err) {
        console.log(err)
      });      
    }

    res.send(req.body)
}

export default saveDesign;