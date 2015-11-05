import {Component} from 'react'
import {
  RefreshIndicator,
} from 'material-ui'
import R from 'ramda'
import {connect} from 'react-redux'

import {fetchOffer, changeCharacteristic} from '../actions/offers'
import {createOrder} from '../actions/orders'
import {addToShoppingcart, loadShoppingcart} from '../actions/shoppingcart'
import OfferDetail from '../components/offer-detail'

@connect(state => {
  return {offer: state.offer}
})
export default class OfferPage extends Component {

  render() {
    let {offer, dispatch, params} = this.props
    let handleOrder = offer => dispatch(createOrder(offer))
    let handleAddToCart = offer => dispatch(addToShoppingcart(offer))
    let handleChangedCharacteristic = (offer, name, value) => {
      dispatch(changeCharacteristic(offer, name, value))
    }
    return (
        <div>
          {
            R.isNil(offer)
              ? loadingIndicator(100)
              : <OfferDetail
                offer={offer}
                onCharacteristicChanged={handleChangedCharacteristic}
                onOrder={handleOrder}
                onAddToCart={handleAddToCart}/>
          }
        </div>
    )
  }

  componentWillMount() {
    let {dispatch, params} = this.props
    let {_id} = params
    dispatch(fetchOffer(_id))
    dispatch(loadShoppingcart())
  }
}

let loadingIndicator = size => {
  let left = (window.screen.width - size) / 2
  let top = 300
  return <RefreshIndicator size={size} left={left} top={top} status="loading" />
}
