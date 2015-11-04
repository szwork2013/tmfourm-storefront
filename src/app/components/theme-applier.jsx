import R from 'ramda'
import {Component} from 'react'
import {SelectField} from 'material-ui'
import Radium from 'radium'

import {grid} from '../styles'

@Radium
export default class ThemeApplier extends Component {

  render() {
    let {themes, onThemeApplied} = this.props
    let menuItems = R.compose(
      R.map(key => ({text: key})),
      R.keys
    )
    let handleSelectChanged = (evt, idx, item) => onThemeApplied(item.text)
    return (
      <div style={[grid.grid]}>
        <div style={[grid.cell, grid.u1of6]}>
          <p> Choose a Theme to Apply... </p>
        </div>
        <div style={[grid.cell, grid.u1of6]}>
          <SelectField
            onChange={handleSelectChanged}
            menuItems={menuItems(themes)}/>
        </div>
      </div>
    )
  }
}
