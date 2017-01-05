import React, { Component } from 'react'
import Template from './infrastracture/Template'
import Label from './Create/Label'
import axios from 'axios'
import WebFont from 'webfontloader'
// import { browserHistory } from 'react-router'

class Preview extends Component {

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

    this.changeValue = this.changeValue.bind(this)
    this.changeOpenPanel = this.changeOpenPanel.bind(this)
    this.changeLabelName = this.changeLabelName.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this.deleteLabel = this.deleteLabel.bind(this)
    this.addLabel = this.addLabel.bind(this)
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

  // Add label to the page

  addLabel() {
    var id = this.state.labels.length + 1
    var currentLabels = this.state.labels
    var newLabel = {
      id: id,
      name: 'Title'
    }
    
    currentLabels.push(newLabel)

    this.setState({
      labels: currentLabels
    })
  }

  // Change label name

  changeLabelName(id, event) {
    var text = event.target.innerHTML
    const { labels } = this.state
    function findLabelById(label) { 
        return label.id === id;
    }
    var focusLabel = labels.find(findLabelById)
    var index = labels.indexOf(focusLabel)
    focusLabel['name'] = text
    labels[index] = focusLabel
    this.setState({
      labels: labels
    })
  }

  // Change state from input value

  changeValue(event) {
    var design = this.state.design
    var value = event.target.value
    var parsed = parseInt(value, 10)
    if (!isNaN(parsed)) {
      design[event.target.name] = parsed
    } else {
      design[event.target.name] = value
    }
    this.setState({
      design: design
    })
  }


// Print document

  printDocument() {
    window.print();
  }

// Manualy change open panel in the sidebar

  changeOpenPanel(activeKey) {
    this.setState({ 
      openPanel: activeKey 
    })
  }

// Zoom functions

  zoomIn() {
    var current = this.state.zoom
    var newZoom = current + 0.2
    if (current < 1.3) {
      this.setState({
        zoom: newZoom
      })
    }
  }

  zoomOut() {
    var current = this.state.zoom
    var newZoom = current - 0.2
    if (current > 0.9) {
      this.setState({
        zoom: newZoom
      })
    }
  }

  deleteLabel(id) {
    console.log('DELETE LABEL')
    console.log(id)
    var labels = this.state.labels
    for (var i = 0; i < labels.length; i++) {
        if(labels[i]['id'] === id) {
            labels.splice(i, 1);
        }
    }
  }


  render() {

    const fontName = this.state.design.fontFamily.replace(' ', '+')

    return (

    <Template width="full" loaderText="Label generator is loading...">

      <link rel="stylesheet" type="text/css" href={'https://fonts.googleapis.com/css?family='+fontName} />

      <div className="workcontent no-sidebar">

        <div className="action-buttons">
          <button className="btn btn-primary"><span className="lnr lnr-undo"></span></button>
          <button className="btn btn-primary"><span className="lnr lnr-redo"></span></button>
          <button className="btn btn-primary" onClick={() => this.zoomIn()}><span className="lnr lnr-plus-circle"></span></button>
          <a className="btn btn-primary"><span>{this.state.zoom*100}%</span></a>
          <button className="btn btn-primary" onClick={() => this.zoomOut()}><span className="lnr lnr-circle-minus"></span></button>

          <div className="pull-right">
            <button className="btn btn-primary" disabled><span className="lnr lnr-cloud-upload"></span> Save</button>
            <button className="btn btn-primary printButton" onClick={this.printDocument}><span className="lnr lnr-printer"></span>  Print</button>
            <button className="btn btn-primary"><span className="lnr lnr-download"></span> Download</button>
          </div>
        </div>

        <div id="canvas" className="canvas" style={{ transform: 'scale('+this.state.zoom+','+this.state.zoom+')' }}>
          <div className="canvas-printable">
            <div className="canvas-grid">

              {
                this.state.labels.map((label) => {
                  return <Label 
                            key={label.id}
                            id={label.id} 
                            name={label.name} 
                            design={this.state.design}
                            changeNameHandler={this.changeLabelName.bind(this, label.id)}
                            openLabelPanel={() => this.changeOpenPanel('2')}
                            openTextPanel={() => this.changeOpenPanel('4')}
                            changeText={this.changeLabelName}
                            deleteLabel={this.deleteLabel}
                            >
                         </Label>
                })
              }

              <div className="canvas-grid-item end-item" onClick={() => this.addLabel()}>
                <div id="add-label"><span className="lnr lnr-plus-circle"></span><br/><p>Add label</p></div>
              </div>

            </div>

            <div className="canvas-footer">Created using MissBerry Label Generator (www.missberry.pl)</div>
          </div>
        </div>

      </div>
    </Template>

    );
  }
}

export default Preview;



