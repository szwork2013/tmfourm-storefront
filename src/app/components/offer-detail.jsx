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
  TableRow,
  TableRowColum,
} from 'material-ui'

import {grid} from '../styles'

@Radium
export default class OfferDetail extends Component {

  render() {
    let {offer, onAddToCart, onOrder} = this.props
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
          <ConfigurableCharacteristics offer={offer}/>
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
      <TableRowColum>{name}</TableRowColum>
      <TableRowColum>
        {
          R.compose(
            R.join(', '),
            R.map(R.prop('value'))
          )(productSpecCharacteristicValue)
        }
      </TableRowColum>
    </TableRow>
  )
  return (
    <div>
      <h3>Display Characteristics</h3>
      <Table selectable={false}>
        <TableHeader key={1}>
          <TableRow key={1}>
            <TableHeaderColumn key={1}>Name</TableHeaderColumn>
            <TableHeaderColumn key={2}>Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        {
          R.compose(
            R.map(renderCharacteristic),
            R.filter(R.propEq('configurable', false)),
            R.chain(R.prop('productSpecCharacteristic'))
          )(productSpecification)
        }
      </Table>
    </div>
  )
}


let ConfigurableCharacteristics = props => {
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
