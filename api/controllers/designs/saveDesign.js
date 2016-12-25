import Design from '../../models/design';

const saveDesign = (req, res) => {

    var newDesign = new Design(req.body)
    newDesign.save(function(err) {
      console.log(err)
    });
    res.send(req.body)
}

export default saveDesign;