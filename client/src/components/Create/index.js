import React, { Component } from 'react'
import Template from '../infrastracture/Template'
import { PanelGroup, Panel } from 'react-bootstrap'
import Label from './Label'
import PopupColorPicker from './PopupColorPicker'
import { SquareShape, CircleShape, EllipseShape, RectangleShape, BadgeShape, LabelShape } from './Shapes'
import { sampleLabels, daysOfMonth } from './sampleData.js'
import cloudinary from 'cloudinary'

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
        shape: 1,
        fontFamily: 'Proxima Nova',
        fontSize: 18,
        letterSpacing: '0',
        textColor: '#fff',
        textAlign: 'center',
        textDecoration: 'none',
        fontStyle: 'normal',
        textTransform: 'none',

        borders: [
          {id: 1,
          borderWidth: 10,
          borderStyle: 'solid',
          borderColor: '#ddd'},
          {id: 2,
          borderWidth: 10,
          borderStyle: 'solid',
          borderColor: '#333'}
        ],

        width: 50,
        height: 50,
        backgroundColor: '#333',
        backgroundImage: '',
      },
      labels: sampleLabels,
      calendar: {
        days: daysOfMonth,
        month: 'December',
        year: 2016
      },
      selected: []
    }

    this.changeValue = this.changeValue.bind(this)
    this.changeOpenPanel = this.changeOpenPanel.bind(this)
    this.changeLabelName = this.changeLabelName.bind(this)
    this.colorHandleClose = this.colorHandleClose.bind(this)
    this.colorHandleClick = this.colorHandleClick.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this.selectLabel = this.selectLabel.bind(this)
    this.deleteSelected = this.deleteSelected.bind(this)
    this.addBorder = this.addBorder.bind(this)
    this.changeShape = this.changeShape.bind(this)
    this.changeBorderValue = this.changeBorderValue.bind(this)
    this.changeProjectSettings = this.changeProjectSettings.bind(this)
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

  changeLabelName(id, event, value) {
    const { labels } = this.state
    function findLabelById(label) { 
        return label.id === id;
    }
    var focusLabel = labels.find(findLabelById)
    var index = labels.indexOf(focusLabel)
    focusLabel['name'] = value
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
    console.log(property, id, color)
    var design = this.state.design
    var borders = design.borders
    for (var i = 0; i < borders.length; i++) {
        if(borders[i]['id'] === id) {
            borders[i][property] = color.hex
        }
    }
    this.setState({ design: design })
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

// Handle selecting and deleting labels

  selectLabel(id) {
    var selected = this.state.selected
    var index = selected.indexOf(id)
    if (index === -1) {
      selected.push(id)
      this.setState({
        selected: selected
      })
    } else {
      selected.splice(index, 1);
    }
  }

  deleteSelected() {
    var selected = this.state.selected
    var labels = this.state.labels
    for (var j = 0; j < selected.length; j++) {
      for (var i = 0; i < labels.length; i++) {
          if(labels[i]['id'] === selected[j]) {
              labels.splice(i, 1);
          }
      }
    }
    this.setState({
      labels: labels
    })
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

  render() {

    return (

    <Template width="full">

      <div className="sidebar">
        <div className="icons-bar">
          <div className={this.state.openPanel === '1' ? "menu-icon active" : "menu-icon"} onClick={() => this.changeOpenPanel('1')}>
            <div className="icon"><span className="lnr lnr-cog"></span></div>
            <p>General</p>
          </div>
          <div className={this.state.openPanel === '2' ? "menu-icon active" : "menu-icon"} onClick={() => this.changeOpenPanel('2')}>
            <div className="icon"><span className="lnr lnr-star-half"></span></div>
            <p>Shape</p>
          </div>
          <div className={this.state.openPanel === '3' ? "menu-icon active" : "menu-icon"} onClick={() => this.changeOpenPanel('3')}>
            <div className="icon"><span className="lnr lnr-magic-wand"></span></div>
            <p>Style</p>
          </div>
          <div className={this.state.openPanel === '4' ? "menu-icon active" : "menu-icon"} onClick={() => this.changeOpenPanel('4')}>
            <div className="icon"><span className="lnr lnr-text-format"></span></div>
            <p>Text</p>
          </div>

          { this.state.selected.length !== 0 &&
            <div className="menu-icon push-bottom" onClick={this.deleteSelected}>
              <div className="icon"><span className="lnr lnr-trash"></span></div>
              <p>Delete</p>
            </div>
          }
        </div>

        <PanelGroup activeKey={this.state.openPanel} onSelect={this.changeOpenPanel} accordion>

          <Panel header="General" eventKey="1">

            <div className="form-group">
              <label>Project name</label>
              <input className="form-control" name="title" type="text" value={this.state.title} onChange={this.changeProjectSettings} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" name="description" value={this.state.description} onChange={this.changeProjectSettings}></textarea>
            </div>

            { cloudinary.image("sample.jpg", { width: 100, height: 150, crop: "fill" }) }

            <div className="form-group">
              <label>Visibility</label>
              <select id="visibility" className="form-control">
                <option value="public" selected>Public</option>
                <option value="private">Private</option>
              </select>
            </div>

          </Panel>

          <Panel header="Shape" eventKey="2">

            <div className="design-shapes">
              <div className={ this.state.design.shape === 1 ? "design-shape selected" : "design-shape" } onClick={ this.changeShape.bind(this, 1) }>
                <SquareShape />
              </div>
              <div className={ this.state.design.shape === 2 ? "design-shape selected" : "design-shape" } onClick={ this.changeShape.bind(this, 2) }>
                <CircleShape className={ this.state.design.shape === 2 && "selected" } />
              </div>
              <div className={ this.state.design.shape === 3 ? "design-shape selected" : "design-shape" } onClick={ this.changeShape.bind(this, 3) }>
                <EllipseShape className={ this.state.design.shape === 3 && "selected" } />
              </div>
              <div className={ this.state.design.shape === 4 ? "design-shape selected" : "design-shape" } onClick={ this.changeShape.bind(this, 4) }>
                <RectangleShape className={ this.state.design.shape === 4 && "selected" } />
              </div>
              <div className={ this.state.design.shape === 5 ? "design-shape selected" : "design-shape" } onClick={ this.changeShape.bind(this, 5) }>
                <BadgeShape className={ this.state.design.shape === 5 && "selected" } />
              </div>
              <div className={ this.state.design.shape === 6 ? "design-shape selected" : "design-shape" } onClick={ this.changeShape.bind(this, 6) }>
                <LabelShape className={ this.state.design.shape === 6 && "selected" } />
              </div>
              
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Width</label>
                  <div className="input-group">
                    <input type="number" className="form-control" name="width" value={this.state.design.width} onChange={this.changeValue} aria-describedby="basic-addon2" />
                    <span className="input-group-addon" id="basic-addon2">mm</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Height</label>
                  <div className="input-group">
                    <input type="number" className="form-control" name="height" value={this.state.design.height} onChange={this.changeValue} aria-describedby="basic-addon2" />
                    <span className="input-group-addon" id="basic-addon2">mm</span>
                  </div>
                </div>
              </div>
            </div>

            {/*<div className="form-group">
              <label>Rounded corners</label>
              <div className="input-group">
                <input type="number" className="form-control" name="borderRadius" value={this.state.design.borderRadius} onChange={this.changeValue} aria-describedby="basic-addon2" />
                <span className="input-group-addon" id="basic-addon2">px</span>
              </div>
            </div>*/}

          </Panel>


          <Panel header="Style" eventKey="3">

            <div className="form-group">
              <label>Background</label><br/>
              <PopupColorPicker color={ this.state.design.backgroundColor } changeHandler={ this.handleColorChange.bind(this, 'backgroundColor') } />
            </div>

            <label>Border</label>

            {
              this.state.design.borders.map((border, index, array) => {
                  return <div key={index} className="flex-input">
                            <div className="flex-input-item input-group width-30">
                              <input type="number" min="0" className="form-control" name="borderWidth" value={ border.borderWidth } onChange={this.changeBorderValue.bind(this, 'borderWidth', border.id)} aria-describedby="basic-addon2" />
                              <span className="input-group-addon" id="basic-addon2">px</span>
                            </div>
                            <div className="flex-input-item">
                              <PopupColorPicker color={ border.borderColor } changeHandler={ this.handleBorderColorChange.bind(this, 'borderColor', border.id) } />
                            </div>
                            <div className="flex-input-item width-30">
                              <select className="form-control" name="borderStyle" value={ border.borderStyle } onChange={this.changeValue}>
                                <option value="solid">solid</option>
                                <option value="dashed">dashed</option>
                                <option value="dotted">dotted</option>
                              </select>
                            </div>
                            <div className="flex-input-item">
                              {index === (array.length - 1) &&
                                <div className="border-button">
                                  <span className="lnr lnr-plus-circle" onClick={this.addBorder}></span>
                                </div>
                              }
                              {index !== (array.length - 1) &&
                                <div className="border-button">
                                  <span className="lnr lnr-trash" onClick={this.deleteBorder.bind(this, border.id)}></span>
                                </div>
                              }
                            </div>
                          </div>
              })
            }

          </Panel>              

          <Panel header="Text" eventKey="4">

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Font family</label>
                  <select className="form-control" name="fontFamily" value={this.state.design.fontFamily} onChange={this.changeValue}>
                    <option value="Georgia">Georgia</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="Proxima Nova">Proxima Nova</option>
                    <option value="Arial">Arial</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Text color</label>
                  <PopupColorPicker color={ this.state.design.textColor } changeHandler={ this.handleColorChange.bind(this, 'textColor') } />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Font size</label><br/>
                  <div className="input-group">
                    <input type="number" className="form-control" aria-describedby="basic-addon2" name="fontSize" value={this.state.design.fontSize} onChange={this.changeValue} />
                    <span className="input-group-addon" id="basic-addon2">px</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Letter spacing</label><br/>
                  <div className="input-group">
                    <input type="number" className="form-control" aria-describedby="basic-addon2" name="letterSpacing" value={this.state.design.letterSpacing} onChange={this.changeValue} />
                    <span className="input-group-addon" id="basic-addon2">px</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Text alignment</label><br/>
                  <button className={this.state.design.textAlign === 'left' ? 'text-align-btn active' : 'text-align-btn'} onClick={() => this.changeTextAlign('left')}><span className="lnr lnr-text-align-left"></span></button>
                  <button className={this.state.design.textAlign === 'center' ? 'text-align-btn active' : 'text-align-btn'} onClick={() => this.changeTextAlign('center')}><span className="lnr lnr-text-align-center"></span></button>
                  <button className={this.state.design.textAlign === 'right' ? 'text-align-btn active' : 'text-align-btn'} onClick={() => this.changeTextAlign('right')}><span className="lnr lnr-text-align-right"></span></button>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Text style</label><br/>
                  <button id="text-style-italic" className={this.state.design.fontStyle === 'italic' ? 'text-style-btn active' : 'text-style-btn'} onClick={() => this.changeTextStyle('fontStyle', 'italic')}>Aa</button>
                  <button id="text-style-uppercase" className={this.state.design.textTransform === 'uppercase' ? 'text-style-btn active' : 'text-style-btn'} onClick={() => this.changeTextStyle('textTransform', 'uppercase')}>AA</button>
                  <button id="text-style-underline" className={this.state.design.textDecoration === 'underline' ? 'text-style-btn active' : 'text-style-btn'} onClick={() => this.changeTextStyle('textDecoration', 'underline')}>Aa</button>
                </div>
              </div>
            </div>

            <div className="form-group placement-inputs">
              <label>Placement</label><br/>
                  <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">Top</span>
                <input id="text-top" type="number" className="form-control" placeholder="0" aria-describedby="basic-addon1" />
                <span className="input-group-addon px" id="basic-addon2">px</span>
              </div>
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">Right</span>
                <input id="text-right" type="number" className="form-control" placeholder="0" aria-describedby="basic-addon1" />
                <span className="input-group-addon px" id="basic-addon2">px</span>
              </div>
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">Bottom</span>
                <input id="text-bottom" type="number" className="form-control" placeholder="0" aria-describedby="basic-addon1" />
                <span className="input-group-addon px" id="basic-addon2">px</span>
              </div>
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">Left</span>
                <input id="text-left" type="number" className="form-control" placeholder="0" aria-describedby="basic-addon1" />
                <span className="input-group-addon px" id="basic-addon2">px</span>
              </div>
            </div>

          </Panel>
        </PanelGroup>

      </div>

      <div className="workcontent">

        <div className="action-buttons">
          <button className="btn btn-primary"><span className="lnr lnr-undo"></span></button>
          <button className="btn btn-primary"><span className="lnr lnr-redo"></span></button>
          <button className="btn btn-primary" onClick={() => this.zoomIn()}><span className="lnr lnr-plus-circle"></span></button>
          <a className="btn btn-primary"><span>{this.state.zoom*100}%</span></a>
          <button className="btn btn-primary" onClick={() => this.zoomOut()}><span className="lnr lnr-circle-minus"></span></button>

          <div className="pull-right">
            <button className="btn btn-primary"><span className="lnr lnr-cloud-upload"></span> Save</button>
            <button className="btn btn-primary printButton" onClick={this.printDocument}><span className="lnr lnr-printer"></span>  Print</button>
            <button className="btn btn-primary"><span className="lnr lnr-download"></span> Download</button>
          </div>
        </div>

        <div className="canvas" style={{ transform: 'scale('+this.state.zoom+','+this.state.zoom+')' }}>
          <div className="canvas-grid">

            { /*
            <div className="calendar">
              <div className="calendar-header">
                <div className="calendar-title"><span contentEditable={true}>December</span></div>
              </div>
              <div className="calendar-days-names">
                <div className="day"><span contentEditable={true}>Monday</span></div>
                <div className="day"><span contentEditable={true}>Tuesday</span></div>
                <div className="day"><span contentEditable={true}>Wednesday</span></div>
                <div className="day"><span contentEditable={true}>Thursday</span></div>
                <div className="day"><span contentEditable={true}>Friday</span></div>
                <div className="day"><span contentEditable={true}>Saturday</span></div>
                <div className="day"><span contentEditable={true}>Sunday</span></div>
              </div>
              <div className="calendar-days">

              {
                this.state.calendar.days.map((day) => {
                    return <div className="day"><span contentEditable={true}>{day}</span></div>
                })
              }

              </div>
            </div> */ }

            {
              this.state.labels.map((label) => {
                return <Label 
                          key={label.id}
                          id={label.id} 
                          name={label.name} 
                          design={this.state.design}
                          changeNameHandler={this.changeLabelName.bind(this, label.id)}
                          openTextPanel={() => this.changeOpenPanel('3')}
                          openLabelPanel={() => this.changeOpenPanel('2')}
                          selectLabel={this.selectLabel}
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
    </Template>

    );
  }
}

export default Create;
