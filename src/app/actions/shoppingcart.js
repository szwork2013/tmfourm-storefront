import uuid from 'uuid'
import R from 'ramda'

import {createOrder} from './orders'

export const ADD_TO_SHOPPINGCART = 'ADD_TO_SHOPPINGCART'
export function addToShoppingcart(offer) {
  let item = {_id: uuid(), offer}
  return {
    type: ADD_TO_SHOPPINGCART,
    item,
  }
}

export function submitShoppingcart() {
  return (dispatch, getState) => {
    let {shoppingcart} = getState()
    dispatch(createOrder(shoppingcart))
    dispatch(resetShoppingcart())
  }
}

export const RESET_SHOPPINGCART = 'RESET_SHOPPINGCART'
export function resetShoppingcart() {
  let shoppingcart = {
    _id: uuid(),
    items: [],
  }
  return {
    type: RESET_SHOPPINGCART,
    shoppingcart,
  }
}
