import {Component} from 'react'
import {
  RefreshIndicator,
} from 'material-ui'
import R from 'ramda'
import {connect} from 'react-redux'

import {fetchOffer} from '../actions/offers'
import {createOrder} from '../actions/orders'
import {addToShoppingcart} from '../actions/shoppingcart'
import OfferDetail from '../components/offer-detail'

@connect(state => {
  return {offer: state.offer}
})
export default class OfferPage extends Component {

  render() {
    let {offer, dispatch} = this.props
    let handleOrder = offer => dispatch(createOrder(offer))
    let handleAddToCart = offer => dispatch(addToShoppingcart(offer))
    return (
        <div>
          {
            R.isNil(offer)
              ? loadingIndicator(100)
              : <OfferDetail offer={offer} onOrder={handleOrder} onAddToCart={handleAddToCart}/>
          }
        </div>
    )
  }

  componentWillMount() {
    let {dispatch} = this.props
    let {id} = this.props.params
    dispatch(fetchOffer(id))
  }
}

let loadingIndicator = size => {
  let left = (window.screen.width - size) / 2
  let top = 300
  return <RefreshIndicator size={size} left={left} top={top} status="loading" />
}
