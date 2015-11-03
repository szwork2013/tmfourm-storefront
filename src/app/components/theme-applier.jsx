import R from 'ramda'
import {Component} from 'react'
import {SelectField} from 'material-ui'
import Radium from 'radium'

import {grid} from '../styles'

@Radium
export default class ThemeApplier extends Component {

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
