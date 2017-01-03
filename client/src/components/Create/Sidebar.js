import React from 'react'
import cloudinary from 'cloudinary'
import { PanelGroup, Panel } from 'react-bootstrap'
import PopupColorPicker from './PopupColorPicker'
import { SquareShape, CircleShape, BadgeShape, LabelShape, Shape3, Shape4 } from './Shapes'
import FontSelector from './FontSelector'

class Sidebar extends React.Component {

	render() {

    let bgArray = []
    for (var i = 1; i <= 15; i++) {
      bgArray.push(i)
    }

    return (

      <div className="sidebar">
        <div className="icons-bar">
          <div className={this.props.openPanel === '1' ? "menu-icon active" : "menu-icon"} onClick={() => this.props.changeOpenPanel('1')}>
            <div className="icon"><span className="lnr lnr-cog"></span></div>
            <p>General</p>
          </div>
          <div className={this.props.openPanel === '2' ? "menu-icon active" : "menu-icon"} onClick={() => this.props.changeOpenPanel('2')}>
            <div className="icon"><span className="lnr lnr-star-half"></span></div>
            <p>Shape</p>
          </div>
          <div className={this.props.openPanel === '3' ? "menu-icon active" : "menu-icon"} onClick={() => this.props.changeOpenPanel('3')}>
            <div className="icon"><span className="lnr lnr-magic-wand"></span></div>
            <p>Style</p>
          </div>
          <div className={this.props.openPanel === '4' ? "menu-icon active" : "menu-icon"} onClick={() => this.props.changeOpenPanel('4')}>
            <div className="icon"><span className="lnr lnr-text-format"></span></div>
            <p>Text</p>
          </div>

        </div>

        <PanelGroup activeKey={this.props.openPanel} onSelect={this.props.changeOpenPanel} accordion>

          <Panel header="General" eventKey="1">

            <div className="form-group">
              <label>Project name</label>
              <input className="form-control" name="title" type="text" value={this.props.title} onChange={this.props.changeProjectSettings} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea className="form-control" name="description" value={this.props.description} onChange={this.props.changeProjectSettings}></textarea>
            </div>

            <div className="form-group danger-zone">
              <label>Delete project</label>
              <button className="btn btn-danger" onClick={this.props.showConfirmModal}><span className="lnr lnr-trash"></span> Delete</button>
            </div>

          </Panel>

          <Panel header="Shape" eventKey="2">

            <div className="design-shapes">
              <div className={ this.props.design.shape === 1 ? "design-shape selected" : "design-shape" } onClick={ this.props.changeShape.bind(this, 1) }>
                <SquareShape />
              </div>
              <div className={ this.props.design.shape === 2 ? "design-shape selected" : "design-shape" } onClick={ this.props.changeShape.bind(this, 2) }>
                <CircleShape className={ this.props.design.shape === 2 && "selected" } />
              </div>
              <div className={ this.props.design.shape === 3 ? "design-shape selected" : "design-shape" } onClick={ this.props.changeShape.bind(this, 3) }>
                <Shape3 className={ this.props.design.shape === 3 && "selected" } />
              </div>
              <div className={ this.props.design.shape === 4 ? "design-shape selected" : "design-shape" } onClick={ this.props.changeShape.bind(this, 4) }>
                <Shape4 className={ this.props.design.shape === 4 && "selected" } />
              </div>
              <div className={ this.props.design.shape === 5 ? "design-shape selected" : "design-shape" } onClick={ this.props.changeShape.bind(this, 5) }>
                <BadgeShape className={ this.props.design.shape === 5 && "selected" } />
              </div>
              <div className={ this.props.design.shape === 6 ? "design-shape selected" : "design-shape" } onClick={ this.props.changeShape.bind(this, 6) }>
                <LabelShape className={ this.props.design.shape === 6 && "selected" } />
              </div>
              
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Width</label>
                  <div className="input-group">
                    <input type="number" className="form-control" name="width" value={this.props.design.width} onChange={this.props.changeValue} aria-describedby="basic-addon2" />
                    <span className="input-group-addon" id="basic-addon2">mm</span>
                  </div>
                </div>
              </div>
            </div>

          </Panel>


          <Panel header="Style" eventKey="3">

            <div className="form-group">
              <label>Border</label>

              {
                this.props.design.borders.map((border, index, array) => {
                    return <div key={index} className="flex-input">
                              <div className="flex-input-item input-group width-30">
                                <input type="number" min="0" className="form-control" name="borderWidth" value={ border.borderWidth } onChange={this.props.changeBorderValue.bind(this, 'borderWidth', border.id)} aria-describedby="basic-addon2" />
                                <span className="input-group-addon" id="basic-addon2">px</span>
                              </div>
                              <div className="flex-input-item">
                                <PopupColorPicker color={ border.borderColor } changeHandler={ this.props.handleBorderColorChange.bind(this, 'borderColor', border.id) } />
                              </div>
                              <div className="flex-input-item width-30">
                                <select className="form-control" name="borderStyle" value={ border.borderStyle } onChange={this.changeValue}>
                                  <option value="solid">solid</option>
                                  <option value="dashed">dashed</option>
                                  <option value="dotted">dotted</option>
                                </select>
                              </div>
                              { /*
                              <div className="flex-input-item">
                                {index >= 1 &&
                                  <div className="border-button">
                                    <span className="lnr lnr-plus-circle" onClick={this.props.addBorder}></span>
                                  </div>
                                }
                                {index >= 2 &&
                                  <div className="border-button">
                                    <span className="lnr lnr-trash" onClick={this.props.deleteBorder.bind(this, border.id)}></span>
                                  </div>
                                }
                              </div>
                              */}
                            </div>
                })
              }
            </div>

            <div className="form-group">
              <label>Background color</label><br/>
              <PopupColorPicker color={ this.props.design.backgroundColor } changeHandler={ this.props.handleColorChange.bind(this, 'backgroundColor') } />
            </div>

            <div className="form-group">
              <label>Background image</label><br/>

              <div className="bg-image-options">

                <img 
                  className="bg-image-option"
                  src={ cloudinary.url("defaultBackgrounds/no-bg", { width: 70, height: 70, crop: "fill" }) } 
                  role="presentation"
                  onClick={ this.props.changeBackgroundImage.bind(this, '') } />

                { bgArray.map( item => {
                  return (
                    <img 
                      key={item}
                      className="bg-image-option"
                      src={ cloudinary.url("defaultBackgrounds/"+item+".png", { width: 70, height: 70, crop: "fill" }) } 
                      role="presentation"
                      onClick={ this.props.changeBackgroundImage.bind(this, "defaultBackgrounds/"+item+".png") } />
                  )
                })}

              </div>

            </div>

          </Panel>              

          <Panel header="Text" eventKey="4">

            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <label>Font family</label>
                  <select className="form-control" name="fontFamily" value={this.props.design.fontFamily} onChange={this.props.changeFont}>
                    {
                      this.props.availableFonts.map((font) => {
                        return <option key={font.family} value={font.family} style={{fontFamily: 'Comic Sans'}}>{font.family}</option>
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Color</label>
                  <PopupColorPicker color={ this.props.design.textColor } changeHandler={ this.props.handleColorChange.bind(this, 'textColor') } />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Font size</label><br/>
                  <div className="input-group">
                    <input type="number" className="form-control" aria-describedby="basic-addon2" name="fontSize" value={this.props.design.fontSize} onChange={this.props.changeValue} />
                    <span className="input-group-addon" id="basic-addon2">px</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Font weight</label>
                  <select className="form-control" name="fontWeight" value={this.props.design.fontWeight} onChange={this.props.changeValue}>
                    <option value="100">Ultra light</option>
                    <option value="300">Light</option>
                    <option value="400">Normal</option>
                    <option value="600">Bold</option>
                    <option value="800">Black</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Letter spacing</label><br/>
                  <div className="input-group">
                    <input type="number" className="form-control" aria-describedby="basic-addon2" name="letterSpacing" value={this.props.design.letterSpacing} onChange={this.props.changeValue} />
                    <span className="input-group-addon" id="basic-addon2">px</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Text style</label><br/>
                  <button id="text-style-italic" className={this.props.design.fontStyle === 'italic' ? 'text-style-btn active' : 'text-style-btn'} onClick={() => this.props.changeTextStyle('fontStyle', 'italic')}>Aa</button>
                  <button id="text-style-uppercase" className={this.props.design.textTransform === 'uppercase' ? 'text-style-btn active' : 'text-style-btn'} onClick={() => this.props.changeTextStyle('textTransform', 'uppercase')}>AA</button>
                  <button id="text-style-underline" className={this.props.design.textDecoration === 'underline' ? 'text-style-btn active' : 'text-style-btn'} onClick={() => this.props.changeTextStyle('textDecoration', 'underline')}>Aa</button>
                </div>
              </div>
            </div>

            {/*
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Text alignment</label><br/>
                  <button className={this.props.design.textAlign === 'left' ? 'text-align-btn active' : 'text-align-btn'} onClick={() => this.props.changeTextAlign('left')}><span className="lnr lnr-text-align-left"></span></button>
                  <button className={this.props.design.textAlign === 'center' ? 'text-align-btn active' : 'text-align-btn'} onClick={() => this.props.changeTextAlign('center')}><span className="lnr lnr-text-align-center"></span></button>
                  <button className={this.props.design.textAlign === 'right' ? 'text-align-btn active' : 'text-align-btn'} onClick={() => this.props.changeTextAlign('right')}><span className="lnr lnr-text-align-right"></span></button>
                </div>
              </div>
            </div>*/}

          </Panel>
        </PanelGroup>

      </div>

    )
  }

}

export default Sidebar