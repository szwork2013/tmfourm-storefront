import {Component} from 'react'
import {
  RefreshIndicator,
} from 'material-ui'
import R from 'ramda'
import {connect} from 'react-redux'

import {fetchOffer, changeCharacteristic} from '../actions/offers'
import {oneClickBuy} from '../actions/orders'
import {addToShoppingcart, loadShoppingcart} from '../actions/shoppingcart'
import OfferDetail from '../components/offer-detail'

@connect(state => {
  return {offer: state.offer}
})
export default class OfferPage extends Component {

  render() {
    let {offer, dispatch, params, history} = this.props
    let handlePlacedOrder = offer => {
      dispatch(oneClickBuy(offer))
      history.pushState(null, '/orders')
    }
    let handleAddedShoppingcart = offer => dispatch(addToShoppingcart(offer))
    let handleChangedCharacteristic = (offer, name, value) => {
      dispatch(changeCharacteristic(offer, name, value))
    }
    let renderOffer = offer => <OfferDetail
      offer={offer}
      onCharacteristicChanged={handleChangedCharacteristic}
      onOrderPlaced={handlePlacedOrder}
      onShoppingcartAdded={handleAddedShoppingcart}/>
    return (
        <div>
          {
            R.cond([
              [R.complement(R.isNil), renderOffer],
              [R.T, R.always(loadingIndicator(100))],
            ])(offer)
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
