import {Component} from 'react'
import R from 'ramda'
import Radium from 'radium'
import {
  RaisedButton,
} from 'material-ui'

import {grid} from '../styles'

@Radium
export default class OfferDetail extends Component {

  render() {
    let {offer, onAddToCart, onOrder} = this.props
    return (
      <div style={[grid.grid, grid.gridGutters]}>
        <div style={[grid.cell, grid.cellGuttersXl]}>
          <div>
            <h1>{offer.name}</h1>
            <p>{offer.description}</p>
          </div>
          {
            R.map(({_id, name, description}) => (
              <div key={_id}>
                <h2>{name}</h2>
                <p>{description}</p>
              </div>
            ), offer.attachments)
          }
        </div>
        <div style={[grid.cell, grid.cellGuttersXl, grid.u1of3]}>
          <div style={[grid.grid, grid.gridGutters]}>
            <div style={[grid.cell, grid.cellGutters, grid.cellBottom]}>
              <RaisedButton label="Order" primary={true} onClick={onOrder.bind(this, offer)}/>
            </div>
            <div style={[grid.cell, grid.cellGutters]}>
              <RaisedButton label="Add to shopping cart" onClick={onAddToCart.bind(this, offer)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
