import {Component} from 'react'
import Radium from 'radium'
import {connect} from 'react-redux'

import {grid, container} from '../styles'
import OfferFilter from '../components/offer-filter'
import OfferList from '../components/offer-list'
import {fetchCategories} from '../actions/categories'
import {fetchOffers} from '../actions/offers'
import {oneClickBuy} from '../actions/orders'
import {addToShoppingcart, loadShoppingcart} from '../actions/shoppingcart'

@connect(state => {
  let {offers, categories} = state
  let {data, filters, options, message} = offers
  return {offers: data, filters, options, message, categories}
})
@Radium
export default class OffersPage extends Component {

  render() {
    let {offers, categories, dispatch, history, filters, options, message} = this.props
    let handleViewOffer = offer => {
      let {_id} = offer
      history.pushState(null, `/offers/detail/${_id}`)
    }
    let handleOrder = offer => {
      dispatch(oneClickBuy(offer))
      history.pushState(null, '/orders')
    }
    let handleAddToCart = offer => {
      dispatch(addToShoppingcart(offer))
    }
    let handleCategoryChange = (evt, selected) => {
      let {name} = filters
      dispatch(fetchOffers(name, selected))
    }
    let handleOfferNameChange = evt => {
      let {category} = filters
      let name = evt.target.value
      dispatch(fetchOffers(name, category))
    }
    return (
      <div style={[grid.grid, grid.gridGutters]}>
        <div style={[grid.cell, grid.cellGutters, grid.u1of5]}>
          <OfferFilter
            categories={categories}
            selectedCategory={filters.category}
            onCategoryChange={handleCategoryChange}
            onOfferNameChange={handleOfferNameChange}/>
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
    let {dispatch, filters, options} = this.props
    let {name, category} = filters
    dispatch(fetchCategories())
    dispatch(fetchOffers(name, category, options))
    dispatch(loadShoppingcart())
  }
}
