import {Component} from 'react'
import {
  Paper,
  RaisedButton,
} from 'material-ui'
import R from 'ramda'
import Radium from 'radium'

import {grid} from '../styles'

@Radium
export default class Shoppingcart extends Component {

  render() {
    let {shoppingcart, onSubmit} = this.props
    return (
      <div>
        <RaisedButton label="Submit" primary={true}
          onClick={onSubmit.bind(this, shoppingcart)}/>
        {
          R.map(({_id, productOffering}) => (
            <Paper key={_id} style={{marginTop: 36}} zDepth={3}>
              <div style={[grid.grid, grid.gridGutters]}>
                <div style={[grid.cell, grid.cellGutters, grid.u1of8, grid.cellCenter]}>
                  <img
                    src={"//place-hold.it/200/CDDC39/fff&fontsize=24&text=" + productOffering.name}
                    style={{width: 120}}/>
                </div>
                <div style={[grid.cell, grid.cellGutters]}>
                  <h3>{productOffering.name}</h3>
                  <p>{productOffering.description}</p>
                </div>
              </div>
            </Paper>
          ), shoppingcart.items)
        }
      </div>
    )
  }
}
