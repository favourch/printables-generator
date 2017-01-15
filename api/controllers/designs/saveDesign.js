import Design from '../../models/design';
import Horseman from 'node-horseman'

const saveDesign = (req, res) => {

    const id = req.body._id
    const authorId = req.user._id
    const designData = req.body
    designData.authorId = authorId

    // UPDATE IF HAS AN ID
    if (typeof id !== "undefined") {
      Design.findByIdAndUpdate(id, designData, {}, function(err) {
        if (err) { return res.send(err) }
        takeDesignScreenshot(id)
        generateDesignPdf(id)
      })
    }

    // INSERT IF DOESN'T HAVE AN ID
    else {
      const newDesign = new Design(designData)
      newDesign.save(function(err, design) {
        if (err) { return res.send(err) }
        takeDesignScreenshot(design._id)
        generateDesignPdf(design._id)
      })     
    }

    res.sendStatus(200)
}

export default saveDesign;


export const takeDesignScreenshot = (id) => {
    var horseman = new Horseman();
    var url = 'http://localhost:3000/preview/' + id

    horseman
      .viewport(1440,1000)
      .open(url)
      .wait(5000)
      .html('html', 'client/public/img/designs/html.html')
      .crop('#canvas', 'client/public/img/designs/'+id+'.jpg')
      .close();
}


export const generateDesignPdf = (id) => {
    var horseman = new Horseman();
    var url = 'http://localhost:3000/pdf/' + id

    horseman
      .open(url)
      .wait(5000)
      .pdf('client/public/img/designs/'+id+'.pdf', {
        width: '210mm',
        height: '297mm',
        margin: '0cm',
        footer: {
          height: '15mm',
          contents: function(pageNum, numPages) {
            return '<p style="font-family: Roboto; font-weight: light; color: #666; font-size: 10px; text-align: center">Created using MissBerry.pl label generator</p>';
          }
        }
      })
      .close();  
}

