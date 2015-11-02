import R from 'ramda'
import {Component} from 'react'
import {
  Paper,
  TextField,
  SelectField,
  Styles,
  Utils,
} from 'material-ui'
import Radium from 'radium'
import {connect} from 'react-redux'

import {applyTheme} from '../actions/themes'
import {grid} from '../styles'

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
    let {themes} = this.props
    let menuItems = R.compose(
      R.map(key => ({text: key})),
      R.keys
    )

    return (
      <div style={[grid.grid]}>
        <div style={[grid.cell, grid.u1of6]}>
          <p> Choose a Theme to Apply... </p>
        </div>
        <div style={[grid.cell, grid.u1of6]}>
          <SelectField
            onChange={this.handleSelectChange}
            menuItems={menuItems(themes)}/>
        </div>
      </div>
    )
  }

  handleSelectChange = (evt, idx, item) => {
    let {onApplyTheme} = this.props
    onApplyTheme(item.text)
  }
}

@Radium
class ThemeCreator extends Component {

  render() {

    return (
      <div>
      </div>
    )
  }
}



let menuItems = [
  {text: 'Light'},
  {text: 'Dark'},
]
