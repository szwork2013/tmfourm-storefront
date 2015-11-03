import R from 'ramda'
import {Component} from 'react'
import {
  Paper,
  TextField,
  SelectField,
  RaisedButton,
} from 'material-ui'
import Radium from 'radium'

import {grid} from '../styles'
import Themes from '../themes'

@Radium
export default class ThemeCreator extends Component {

  render() {
    let {fontFamily, spacing, palette} = Themes()
    let handleChangedFont = font => console.log(font)
    let handleChangedSpacing = spacing => console.log(spacing)
    let handleChangedPalette = platte => console.log(palette)
    return (
      <div>
        <RaisedButton label="Create a New Theme" primary={true}/>
        <FontEditor fontFamily={fontFamily} onFontChanged={handleChangedFont}/>
        <SpacingEditor spacing={spacing} onSpacingChanged={handleChangedSpacing}/>
        <PaletteEditor palette={palette} onPaletteChanged={handleChangedPalette}/>
      </div>
    )
  }
}

let FontEditor = props => (
  <div>
    <h3>Font</h3>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Font Family</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.fontFamily}/>
      </div>
    </div>
  </div>
)

let SpacingEditor = props => (
  <div>
    <h3>Spacing</h3>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Icon Size</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.spacing.iconSize}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Desktop Gutter</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          defaultValue={props.spacing.desktopGutter}
          floatingLabelText="Standard Size"/>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          defaultValue={props.spacing.desktopGutterMore}
          floatingLabelText="Large Size"/>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          defaultValue={props.spacing.desktopGutterLess}
          floatingLabelText="Small Size"/>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          defaultValue={props.spacing.desktopGutterMini}
          floatingLabelText="Miniml Size"/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Desktop Key Line Increment</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.spacing.desktopKeylineIncrement}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Desktop Dropdown Menu Item Height</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.spacing.desktopDropDownMenuItemHeight}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Desktop Dropdown Menu Font Size</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.spacing.desktopDropDownMenuFontSize}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Desktop Left Nav Menu Item Height</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.spacing.desktopLeftNavMenuItemHeight}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Desktop Sub Header Height</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.spacing.desktopSubheaderHeight}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Desktop Toolbar Height</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.spacing.desktopToolbarHeight}/>
      </div>
    </div>
  </div>
)

let PaletteEditor = props => (
  <div>
    <h3>Color Palette</h3>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Primary Color</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          floatingLabelText="1st Color"
          defaultValue={props.palette.primary1Color}/>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          floatingLabelText="2nd Color"
          defaultValue={props.palette.primary2Color}/>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          floatingLabelText="3rd Color"
          defaultValue={props.palette.primary3Color}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Accent Color</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          floatingLabelText="1st Color"
          defaultValue={props.palette.accent1Color}/>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          floatingLabelText="2nd Color"
          defaultValue={props.palette.accent2Color}/>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          floatingLabelText="3rd Color"
          defaultValue={props.palette.accent3Color}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Text Color</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          floatingLabelText="Standard Color"
          defaultValue={props.palette.textColor}/>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField
          floatingLabelText="Alternate Color"
          defaultValue={props.palette.alternateTextColor}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Canvas Color</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.palette.canvasColor}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Border Color</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.palette.borderColor}/>
      </div>
    </div>
    <div style={grid.grid}>
      <div style={grid.cell, grid.u1of6}>
        <p>Disabled Color</p>
      </div>
      <div style={grid.cell, grid.u1of6}>
        <TextField defaultValue={props.palette.disabledColor}/>
      </div>
    </div>
  </div>
)
