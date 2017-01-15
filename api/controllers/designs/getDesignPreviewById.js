import Design from '../../models/design';

const getDesignPreviewById = (req, res) => {

  const designId = req.params.designId
  console.log('get design preview by id', designId)
  Design.findOne({ _id: designId }, function (err, response) {
    if (err) {
      console.log('problem');
      return res.sendStatus(404);
    }
    console.log('ok')
    res.send(response)
  })
}

export default getDesignPreviewById;