import {Component} from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'

import {grid, container} from '../styles'
import OfferFilter from '../components/offer-filter'
import OfferList from '../components/offer-list'
import {fetchCategories} from '../actions/categories'
import {viewOffer} from '../actions/offers'
import {oneClickBuy} from '../actions/orders'
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

  componentWillMount() {
    let {dispatch} = this.props
    dispatch(fetchCategories())
  }
}
