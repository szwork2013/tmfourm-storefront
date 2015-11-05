import {Component} from 'react'
import R from 'ramda'
import Radium from 'radium'
import {
  RaisedButton,
  TextField,
  SelectField,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui'

import {grid} from '../styles'

@Radium
export default class OfferDetail extends Component {

  render() {
    let {offer, onAddToCart, onOrder, onCharacteristicChanged} = this.props
    return (
      <div style={[grid.grid, grid.gridGutters]}>
        <div style={[grid.cell, grid.cellGuttersXl]}>
          <div style={[grid.grid, grid.gridGutters]}>
            <div style={[grid.cell, grid.cellGutters, grid.u1of6]}>
              <img style={{width: '100%'}} src={"//place-hold.it/200/CDDC39/fff&fontsize=24&text=" + offer.name}/>
            </div>
            <div style={[grid.cell, grid.cellGutters]}>
              <h1>{offer.name}</h1>
              <p>{offer.description}</p>
            </div>
          </div>
          <div>
            <Tabs>
              <Tab label="Product Description">
                <OfferDescription/>
              </Tab>
              <Tab label="Product Specification">
                <DisplayCharacteristics offer={offer}/>
              </Tab>
              <Tab label="Customer Ratings">
                <h3> Under construction....</h3>
              </Tab>
            </Tabs>
          </div>
        </div>
        <div style={[grid.cell, grid.cellGuttersXl, grid.u1of3]}>
          <h3> Purchase {offer.name} </h3>
          <hr/>
          <Price offer={offer}/>
          <hr/>
          <ConfigurableCharacteristics offer={offer} onCharacteristicChanged={onCharacteristicChanged}/>
          <hr/>
          <div style={[grid.grid]}>
            <div style={[grid.cell, grid.cellBottom]}>
              <RaisedButton label={`Order ${offer.name}`} primary={true} onClick={onOrder.bind(this, offer)}/>
            </div>
            <div style={[grid.cell]}>
              <RaisedButton label="Add to shopping cart" onClick={onAddToCart.bind(this, offer)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

let Price = props => {
  let {produtOfferingPrice} = props.offer
  return (
    <div>
      <h4>Price</h4>
      {
        R.map(({name, price}) => (
          <div key={name} style={grid.grid}>
            <div style={grid.cell}>
              <p>{price.priceType}</p>
            </div>
            <div style={grid.cell}>
              <p>{price.dutyFreeAmount} {price.currencyCode || 'CNY'}</p>
            </div>
          </div>
        ))(produtOfferingPrice)
      }
    </div>
  )
}

let OfferDescription = props => {
  return (
    <div>
      <h3>Offer description from CMS System</h3>
    </div>
  )
}

let DisplayCharacteristics = props => {
  let {productSpecification} = props.offer
  let notEmpty = R.both(R.complement(R.isNil), R.complement(R.isEmpty))
  let renderCharacteristic = ({name, productSpecCharacteristicValue}) => (
    <TableRow key={name}>
      <TableRowColumn>{name}</TableRowColumn>
      <TableRowColumn>
        {
          R.compose(
            R.join(', '),
            R.map(R.prop('value'))
          )(productSpecCharacteristicValue)
        }
      </TableRowColumn>
    </TableRow>
  )
  return (
    <div>
      <h3>Display Characteristics</h3>
      <Table selectable={false}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            R.compose(
              R.map(renderCharacteristic),
              R.filter(R.propEq('configurable', false)),
              R.chain(R.prop('productSpecCharacteristic'))
            )(productSpecification)
          }
        </TableBody>
      </Table>
    </div>
  )
}


let ConfigurableCharacteristics = props => {
  let {offer} = props
  let {productSpecification} = offer
  let notEmpty = R.both(R.complement(R.isNil), R.complement(R.isEmpty))
  let handleCharacteristicChange = (evt, idx, item) => {
    let {name, value, offer} = item.payload
    props.onCharacteristicChanged(offer, name, value)
  }
  let renderCharacteristic = R.cond([
    [notEmpty, ({name, productSpecCharacteristicValue}) => (
      <div key={name} style={grid.grid}>
        <div style={grid.cell}>
          <p>Choose your {name}</p>
        </div>
        <div style={grid.cell}>
          <SelectField
            onChange={handleCharacteristicChange}
            menuItems={R.map(({value, unitOfMeasure}) => ({
              text: value + ' ' + (unitOfMeasure || ''),
              payload: {name, value, offer},
            }), productSpecCharacteristicValue)}/>
        </div>
      </div>
    )],
    [R.T, ({name, productSpecCharacteristicValue}) => (
      <TextField
        floatingLabelText={name}
        hintText={name}/>
    )],
  ])
  return (
    <div>
      <h4>Make your choice</h4>
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
