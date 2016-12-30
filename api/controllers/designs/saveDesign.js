import Design from '../../models/design';
import Horseman from 'node-horseman'

const saveDesign = (req, res) => {

    const id = req.body._id
    const authorId = req.user._id
    const designData = req.body
    designData.authorId = authorId

    console.log('AUTHOR ID')
    console.log(authorId)

    // UPDATE IF HAS AN ID
    if (typeof id !== "undefined") {
      console.log('update because has an id', id)
      Design.findByIdAndUpdate(id, designData, {}, function(err) {
        console.log(err)
        console.log('update and generate screenshot with id', id)
        takeDesignScreenshot(id)
        generateDesignPdf(id)
      })
    }

    // INSERT IF DOESN'T HAVE AN ID
    else {
      const newDesign = new Design(designData)
      newDesign.save(function(err, design) {
        console.log('Inserted design with id:', design._id)
        takeDesignScreenshot(design._id)
        generateDesignPdf(design._id)
      });      
    }

    res.send(req.body)
}

export default saveDesign;


export const takeDesignScreenshot = (id) => {

    var horseman = new Horseman();
    var url = 'http://localhost:3000/preview/' + id

    horseman
      .userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9')
      .viewport(1440,1000)
      .open(url)
      .wait(5000)
      .log('Opened ' + url)
      .log('Generate the screenshot of design: '+id)
      // .screenshot('client/public/img/designs/'+id+'.jpg')
      .crop('#canvas', 'client/public/img/designs/'+id+'.jpg')
      .log('took screenshot')
      .close();
}


export const generateDesignPdf = (id) => {

    var horseman = new Horseman();
    var url = 'http://localhost:3000/preview/' + id

    horseman
      .userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9')
      .open(url)
      .wait(5000)
      .pdf('client/public/img/designs/'+id+'.pdf', {
        format: 'A4',
        margin: '0cm'
      })
      .log('generated pdf')
      .close();  

}

