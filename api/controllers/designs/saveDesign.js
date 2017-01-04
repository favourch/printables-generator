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

    res.sendStatus(200)
}

export default saveDesign;


export const takeDesignScreenshot = (id) => {

    var horseman = new Horseman();
    var url = 'http://localhost:3000/preview/' + id

    horseman
      // .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
      .viewport(1440,1000)
      .open(url)
      .log('opened url')
      .wait(5000)
      .html('html', 'client/public/img/designs/html.html')
      .log('Opened ' + url)
      .log('Generate the screenshot of design: '+id)
      // .screenshot('client/public/img/designs/'+id+'.jpg')
      .crop('#canvas', 'client/public/img/designs/'+id+'.jpg')
      .log('took screenshot')
      .close();
}


export const generateDesignPdf = (id) => {

    var horseman = new Horseman();
    var url = 'http://localhost:3000/pdf/' + id

    horseman
      // .userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9')
      .open(url)
      .wait(5000)
      .pdf('client/public/img/designs/'+id+'.pdf', {
        width: '210mm',
        height: '297mm',
        margin: '0cm',
        footer: {
          height: '15mm',
          contents: function(pageNum, numPages) {
            // if (pageNum == 1) {
            //   return '';
            // }
            return '<p style="font-family: Roboto; font-weight: light; color: #666; font-size: 10px; text-align: center">Created using MissBerry.pl label generator</p>';
          }
        }
      })
      .log('generated pdf')
      .close();  

}

