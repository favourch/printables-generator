import Design from '../../models/design';

const getDesignsByUser = (req, res) => {

  const userId = req.params.userId;
  Design.find({ 'authorId': userId }, function (err, designs) {
    if (err) return console.error(err);
    res.send(designs)
  }).sort({'created': -1})

}

export default getDesignsByUser;