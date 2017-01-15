import React, { Component } from 'react'
import Label from './Create/Label'
import axios from 'axios'
import WebFont from 'webfontloader'

class Pdf extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: 'Labels design',
      description: 'My newest design',
      visibility: 'public',
      openPanel: '1',
      zoom: 1,
      design: {
        shape: 5,
        fontFamily: 'Proxima Nova',
        fontSize: 12,
        fontWeight: 300,
        letterSpacing: '0',
        textColor: '#fff',
        textAlign: 'center',
        textDecoration: 'none',
        fontStyle: 'normal',
        textTransform: 'none',
        borders: [
          {id: 1,
          borderWidth: 0,
          borderStyle: 'solid',
          borderColor: '#333'},
          {id: 2,
          borderWidth: 0,
          borderStyle: 'solid',
          borderColor: '#333'}
        ],
        width: 47,
        height: 47,
        backgroundColor: '#333',
        backgroundImage: '',
      },
      labels: [],
      availableFonts: []
    }

  }


  componentDidMount() {

    const designId = this.props.params.designId

    // GET SAVED DESIGN IF PROVIDED DESIGNID
    if (typeof designId !== "undefined") {
      axios.get('/api/preview-design/'+designId)
      .then(response => {
        this.setState({
            _id: response.data._id,
            title: response.data.title,
            description: response.data.description,
            design: response.data.design, 
            labels: response.data.labels
        })

        // LOAD CHOSEN WEB FONT
        WebFont.load({
          google: {
            families: [response.data.design.fontFamily]
          }
        })
      })
      .catch(function (error) {
        // browserHistory.push('/')
      })
    }

  }


// Print document

  printDocument() {
    window.print();
  }



  render() {

    const fontName = this.state.design.fontFamily.replace(' ', '+')

    return (

        <div>
          <link rel="stylesheet" type="text/css" href={'https://fonts.googleapis.com/css?family='+fontName} />
          <div className="canvas-pdf">
            <div className="canvas-grid">

              {
                this.state.labels.map((label) => {
                  return <Label 
                            key={label.id}
                            id={label.id} 
                            name={label.name} 
                            design={this.state.design}
                            editable={false}
                            >
                         </Label>
                })
              }

            </div>
          </div>
        </div>

    );
  }
}

export default Pdf;



