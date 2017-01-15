import Design from '../../models/design';

const getDesignById = (req, res) => {

  const designId = req.params.designId
  console.log('get design by id', designId)
  Design.findOne({ _id: designId }, function (err, response) {
    if (err) return res.sendStatus(404);
    res.send(response)
  })
}

export default getDesignById;