import Design from '../../models/design';

const deleteDesign = (req, res) => {

    const id = req.body._id

    Design.findByIdAndRemove(id, function(err) {
      console.log(err)
      if (err === null) {
        res.sendStatus(200)
      }
      else {
        res.send(err)
      }
    })
}

export default deleteDesign;