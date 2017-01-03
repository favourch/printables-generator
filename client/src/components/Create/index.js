import React, { Component } from 'react'
import Template from '../infrastracture/Template'
import Label from './Label'
import Sidebar from './Sidebar'
import axios from 'axios'
import { showMessage } from '../infrastracture/utils'
import WebFont from 'webfontloader'
import { browserHistory } from 'react-router'
import { Modal, Button } from 'react-bootstrap'

class Create extends Component {

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
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: '#ddd'},
          {id: 2,
          borderWidth: 6,
          borderStyle: 'solid',
          borderColor: '#333'}
        ],
        width: 47,
        height: 47,
        backgroundColor: '#333',
        backgroundImage: '',
      },
      labels: [],
      availableFonts: [],
      confirmModalVisible: false
    }

    this.changeValue = this.changeValue.bind(this)
    this.changeOpenPanel = this.changeOpenPanel.bind(this)
    this.changeLabelName = this.changeLabelName.bind(this)
    this.colorHandleClose = this.colorHandleClose.bind(this)
    this.colorHandleClick = this.colorHandleClick.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this.addBorder = this.addBorder.bind(this)
    this.changeShape = this.changeShape.bind(this)
    this.changeBorderValue = this.changeBorderValue.bind(this)
    this.changeProjectSettings = this.changeProjectSettings.bind(this)
    this.changeBackgroundImage = this.changeBackgroundImage.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.handleBorderColorChange = this.handleBorderColorChange.bind(this)
    this.changeTextStyle = this.changeTextStyle.bind(this)
    this.changeTextAlign = this.changeTextAlign.bind(this)
    this.changeFont = this.changeFont.bind(this)
    this.deleteLabel = this.deleteLabel.bind(this)
    this.showConfirmModal = this.showConfirmModal.bind(this)
    this.closeConfirmModal = this.closeConfirmModal.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
  }


  componentDidMount() {

    const designId = this.props.params.designId

    // GET SAVED DESIGN IF PROVIDED DESIGNID
    if (typeof designId !== "undefined") {
      axios.get('/api/design/'+designId)
      .then(response => {
        console.log('FOUND THE DESIGN')
        console.log(response)
        this.setState({
            _id: response.data._id,
            title: response.data.title,
            description: response.data.description,
            design: response.data.design, 
            labels: response.data.labels,
            visibility: response.data.visibility
        })

        // LOAD CHOSEN WEB FONT
        WebFont.load({
          google: {
            families: [response.data.design.fontFamily]
          }
        });
      })
      .catch(function (error) {
        browserHistory.push('/404')
      })
    }

    // GET LIST OF GOOGLE FONTS
    axios.get('https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyBCnpPf46kxGMsFE9pQG4Pu2YseRvnjPVE')
      .then(response => {
        var fonts = response.data.items.slice(0,45)
        this.setState({
          availableFonts: fonts
        })
      })
      .catch(console.error);

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

  // Change font and import web font from google

  changeFont(event) {
    const font = event.target.value
    const design = this.state.design
    design.fontFamily = font
    console.log(design)
    this.setState({
      design: design
    })

    WebFont.load({
      google: {
        families: [font]
      }
    });

  }

  // Change project properties 

  changeProjectSettings(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  changeTextAlign(value) {
    var design = this.state.design
    design['textAlign'] = value
    this.setState({
      design: design
    })
  }

  changeTextStyle(property, value) {
    var design = this.state.design
    var currentVal = design[property]
    if (currentVal === 'none') {
      design[property] = value
    }
    else if (currentVal === 'italic') {
      design[property] = 'normal'
    }
    else if (currentVal === 'normal') {
      design[property] = 'italic'
    }
    else {
      design[property] = 'none'
    }

    this.setState({
      design: design
    })
  }

  // Color picker events

  colorHandleClick(property) {
    var display = this.state.displayColorPicker
    display[property] = !this.state.displayColorPicker[property]
    this.setState({ 
      displayColorPicker: display
    })
  }

  colorHandleClose() {
    var obj = this.state.displayColorPicker
    Object.keys(obj).forEach(function (key) {
      obj[key] = false;
    });
    this.setState({ 
      displayColorPicker: obj
    })
  }

  handleColorChange(property, color) {
    var design = this.state.design
    design[property] = color.hex
    this.setState({ design: design })
  }

  handleBorderColorChange(property, id, color) {
    var design = this.state.design
    var borders = design.borders
    for (var i = 0; i < borders.length; i++) {
        if(borders[i]['id'] === id) {
            borders[i][property] = color.hex
        }
    }
    this.setState({ design: design })
  }

// Background image

  changeBackgroundImage(imageId) {
    var design = this.state.design
    design.backgroundImage = imageId
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

// Border functions

  addBorder() {
    var design = this.state.design
    var newBorderId = design.borders.length + 1
    var newBorder = {
      id: newBorderId,
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: '#333'
    }
    design.borders.push(newBorder)
    this.setState({
      design: design
    })
  }

  deleteBorder(id) {
    var design = this.state.design
    var borders = design.borders
    for (var i = 0; i < borders.length; i++) {
        if(borders[i]['id'] === id) {
            borders.splice(i, 1);
        }
    }
    this.setState({
      design: design
    })
  }

  changeBorderValue(property, id, event) {
    var design = this.state.design
    var borders = design.borders
    var value = event.target.value
    var parsed = parseInt(value, 10)
    if (!isNaN(parsed)) {
      value = parsed
    } 
    for (var i = 0; i < borders.length; i++) {
        if(borders[i]['id'] === id) {
            borders[i][property] = value
        }
    }
    this.setState({
      design: design
    })
  }

// Change label shape

  changeShape(id) {
    var design = this.state.design
    design['shape'] = id
    this.setState({
      design: design
    })
  }

// Save the design

  saveDesign() {
    const design = {
      _id: this.state._id,
      title: this.state.title,
      description: this.state.description,
      visibility: this.state.visibility,
      design: this.state.design,
      labels: this.state.labels
    }

    axios.post('/api/design/save', design)
    .then(response => {
      showMessage('success', 'The design has been saved.')
    })
    .catch(error => {
      showMessage('error', 'Something went wrong.')
    })
  }

// Show delete confirmation modal

  showConfirmModal() {
    console.log('Show confirm modal')
    this.setState({
      confirmModalVisible: true
    })
  }

  closeConfirmModal() {
    console.log('Close confirm modal')
    this.setState({
      confirmModalVisible: false
    })
  }

  deleteProject() {
    console.log('Delete the project')
    const design = {
      _id: this.state._id
    }

    axios.post('/api/design/delete', design)
    .then(response => {
      showMessage('success', 'The project has been deleted.')
      browserHistory.push('/')
    })
    .catch(error => {
      showMessage('error', 'Something went wrong.')
    })
  }

  render() {

    return (

    <Template width="full" loaderText="Label generator is loading...">

      <ConfirmModal 
        show={this.state.confirmModalVisible} 
        onHide={this.closeConfirmModal}
        onConfirm={this.deleteProject} />

      <Sidebar 
        openPanel={this.state.openPanel}
        changeOpenPanel={this.changeOpenPanel}
        changeShape={this.changeShape}
        handleColorChange={this.handleColorChange}
        changeBackgroundImage={this.changeBackgroundImage}
        changeBorderValue={this.changeBorderValue}
        handleBorderColorChange={this.handleBorderColorChange}
        deleteSelected={this.deleteSelected}
        changeProjectSettings={this.changeProjectSettings}
        changeValue={this.changeValue}
        changeTextStyle={this.changeTextStyle}
        changeTextAlign={this.changeTextAlign}
        changeFont={this.changeFont}
        showConfirmModal={this.showConfirmModal}
        {...this.state}
      />

      <div className="workcontent">

        <div className="action-buttons">
          <button className="btn btn-primary"><span className="lnr lnr-undo"></span></button>
          <button className="btn btn-primary"><span className="lnr lnr-redo"></span></button>
          <button className="btn btn-primary" onClick={() => this.zoomIn()}><span className="lnr lnr-plus-circle"></span></button>
          <a className="btn btn-primary"><span>{this.state.zoom*100}%</span></a>
          <button className="btn btn-primary" onClick={() => this.zoomOut()}><span className="lnr lnr-circle-minus"></span></button>

          <div className="pull-right">
            <button className="btn btn-primary" onClick={() => this.saveDesign()}><span className="lnr lnr-cloud-upload"></span> Save</button>
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

export default Create;



class ConfirmModal extends React.Component {
  render() {
    return (
      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Delete project</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4>Are you sure you want to delete this project?</h4>
          <p>This operation cannot be undone.</p>

          <div className="buttons-center">
            <Button onClick={this.props.onConfirm}>Yes</Button>
            <Button onClick={this.props.onHide}>No</Button>
          </div>
        </Modal.Body>
        
      </Modal>
    )
  }
}

