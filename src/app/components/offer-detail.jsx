import {Component} from 'react'
import R from 'ramda'
import Radium from 'radium'
import {
  RaisedButton,
  TextField,
  SelectField,
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
            <img src={"//place-hold.it/200/CDDC39/fff&fontsize=24&text=" + offer.name}/>
            <h1>{offer.name}</h1>
            <p>{offer.description}</p>
          </div>

        </div>
        <div style={[grid.cell, grid.cellGuttersXl, grid.u1of3]}>
          <Characteristics offer={offer}/>
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


let Characteristics = props => {
  let {productSpecification} = props.offer
  let notEmpty = R.both(R.complement(R.isNil), R.complement(R.isEmpty))
  let renderCharacteristic = R.cond([
    [notEmpty, ({name, productSpecCharacteristicValue}) => (
      <SelectField
        floatingLabelText={name}
        hintText={name}
        menuItems={R.map(({value}) => ({text: value}), productSpecCharacteristicValue)}/>
    )],
    [R.T, ({name, productSpecCharacteristicValue}) => (
      <TextField
        floatingLabelText={name}
        hintText={name}/>
    )],
  ])
  return (
    <div>
      {
        R.compose(
          R.map(renderCharacteristic),
          R.filter(R.propEq('configurable', true)),
          R.chain(R.prop('productSpecCharacteristic'))
        )(productSpecification)
      }
    </div>
  )
}
