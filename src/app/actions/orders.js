import uuid from 'uuid'
import R from 'ramda'

export const CREATE_ORDER = 'CREATE_ORDER'
export function createOrder(shoppingcart) {
  let order = {
    _id: uuid(),
    name: '',
    description: '',
    items: R.map(item => ({
      _id: uuid(),
      offer: item.offer,
    }), shoppingcart.items),
  }
  return {
    type: CREATE_ORDER,
    order,
  }
}

export function oneClickBuy(offer) {
  return dispatch => {
    let shoppingcart = {
      _id: uuid(),
      items: [
        {
          _id: uuid(),
          offer: offer,
        },
      ],
    }
    dispatch(createOrder(shoppingcart))
  }
}
