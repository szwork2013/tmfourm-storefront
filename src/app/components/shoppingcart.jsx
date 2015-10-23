import {Component} from 'react'
import {
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
          R.map(item => (
            <div key={item._id} style={[grid.grid, grid.gridGutters]}>
              <div style={[grid.cell, grid.cellGutters, grid.u1of8, grid.cellCenter]}>
                <img src={"//place-hold.it/200&text=" + item.offer.name} style={{width: '100%'}}/>
              </div>
              <div style={[grid.cell, grid.cellGutters]}>
                <h3>{item.offer.name}</h3>
                <p>{item.offer.description}</p>
              </div>
            </div>
          ), shoppingcart.items)
        }
      </div>
    )
  }
}
