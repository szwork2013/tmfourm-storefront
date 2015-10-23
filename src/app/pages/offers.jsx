import {Component} from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'

import {grid, container} from '../styles'
import OfferFilter from '../components/offer-filter'
import OfferList from '../components/offer-list'
import {viewOffer} from '../actions/offer'
import {oneClickBuy} from '../actions/order'
import {addToShoppingcart} from '../actions/shoppingcart'

@connect(state => {
  let {offers, categories} = state
  return {offers, categories}
})
@Radium
export default class OffersPage extends Component {

  render() {
    let {offers, categories, dispatch, history} = this.props
    let handleViewOffer = offer => {
      dispatch(viewOffer(offer))
      history.pushState(null, `/offers/${offer._id}`)
    }
    let handleOrder = offer => {
      dispatch(oneClickBuy(offer))
      history.pushState(null, '/orders')
    }
    let handleAddToCart = offer => {
      dispatch(addToShoppingcart(offer))
    }
    return (
      <div style={[grid.grid, grid.gridGutters]}>
        <div style={[grid.cell, grid.cellGutters, grid.u1of5]}>
          <OfferFilter categories={categories}/>
        </div>
        <div style={[grid.cell, grid.cellGutters, grid.cellFit]}>
          <OfferList offers={offers}
            onViewDetail={handleViewOffer}
            onOrder={handleOrder}
            onAddToCart={handleAddToCart}/>
        </div>
      </div>
    )
  }
}

let offers = [
  {
    _id: '111111111111',
    name: 'iphone 6g',
  },
]

let categories = [
  {
    _id: '222222222222',
    name: 'Smart Phone',
  },
  {
    _id: '3333333333333',
    name: 'Smart Phone',
  },
  {
    _id: '444444444444444',
    name: 'Smart Phone',
  },
  {
    _id: '555555555555555',
    name: 'Smart Phone',
  },
  {
    _id: '66666666666666',
    name: 'Smart Phone',
  },
]
