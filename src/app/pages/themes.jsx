import R from 'ramda'
import {Component} from 'react'
import {
  Paper,
  TextField,
  SelectField,
  Styles,
  Utils,
  RaisedButton,
} from 'material-ui'
import Radium from 'radium'
import {connect} from 'react-redux'

import {applyTheme} from '../actions/themes'
import {grid} from '../styles'
import Themes from '../themes'

let {Colors, Spacing} = Styles
let {ColorManipulator} = Utils

@connect(state => {
  let {theme, themes} = state
  return {theme, themes}
})
export default class ThemesPage extends Component {

  render() {
    let {themes, theme} = this.props
    return (
      <div>
        <ThemeApplier onApplyTheme={this.handleApplyTheme} themes={themes}/>
        <ThemeCreator onCreateTheme={this.handleCreateTheme}/>
      </div>
    )
  }

  handleCreateTheme = theme => {

  }

  handleApplyTheme = themeName => {
    let {dispatch} = this.props
    dispatch(applyTheme(themeName))
  }
}

@Radium
class ThemeApplier extends Component {

  render() {
    let {themes, onApplyTheme} = this.props
    let menuItems = R.compose(
      R.map(key => ({text: key})),
      R.keys
    )
    let handleSelectChange = (evt, idx, item) => onApplyTheme(item.text)
    return (
      <div style={[grid.grid]}>
        <div style={[grid.cell, grid.u1of6]}>
          <p> Choose a Theme to Apply... </p>
        </div>
        <div style={[grid.cell, grid.u1of6]}>
          <SelectField
            onChange={handleSelectChange}
            menuItems={menuItems(themes)}/>
        </div>
      </div>
    )
  }
}

@Radium
class ThemeCreator extends Component {

  render() {
    let {fontFamily, spacing, palette} = Themes()
    return (
      <div>
        <RaisedButton label="Create a New Theme" primary={true}/>
        <div>
          <h3>Font</h3>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Font Family</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={fontFamily}/>
            </div>
          </div>
        </div>
        <div>
          <h3>Spacing</h3>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Icon Size</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={spacing.iconSize}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Desktop Gutter</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                defaultValue={spacing.desktopGutter}
                floatingLabelText="Standard Size"/>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                defaultValue={spacing.desktopGutterMore}
                floatingLabelText="Large Size"/>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                defaultValue={spacing.desktopGutterLess}
                floatingLabelText="Small Size"/>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                defaultValue={spacing.desktopGutterMini}
                floatingLabelText="Miniml Size"/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Desktop Key Line Increment</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={spacing.desktopKeylineIncrement}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Desktop Dropdown Menu Item Height</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={spacing.desktopDropDownMenuItemHeight}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Desktop Dropdown Menu Font Size</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={spacing.desktopDropDownMenuFontSize}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Desktop Left Nav Menu Item Height</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={spacing.desktopLeftNavMenuItemHeight}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Desktop Sub Header Height</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={spacing.desktopSubheaderHeight}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Desktop Toolbar Height</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={spacing.desktopToolbarHeight}/>
            </div>
          </div>
        </div>
        <div>
          <h3>Color Palette</h3>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Primary Color</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                floatingLabelText="1st Color"
                defaultValue={palette.primary1Color}/>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                floatingLabelText="2nd Color"
                defaultValue={palette.primary2Color}/>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                floatingLabelText="3rd Color"
                defaultValue={palette.primary3Color}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Accent Color</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                floatingLabelText="1st Color"
                defaultValue={palette.accent1Color}/>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                floatingLabelText="2nd Color"
                defaultValue={palette.accent2Color}/>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                floatingLabelText="3rd Color"
                defaultValue={palette.accent3Color}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Text Color</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                floatingLabelText="Standard Color"
                defaultValue={palette.textColor}/>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField
                floatingLabelText="Alternate Color"
                defaultValue={palette.alternateTextColor}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Canvas Color</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={palette.canvasColor}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Border Color</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={palette.borderColor}/>
            </div>
          </div>
          <div style={grid.grid}>
            <div style={grid.cell, grid.u1of6}>
              <p>Disabled Color</p>
            </div>
            <div style={grid.cell, grid.u1of6}>
              <TextField defaultValue={palette.disabledColor}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
