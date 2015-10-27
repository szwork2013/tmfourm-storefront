import uuid from 'uuid'
import R from 'ramda'

import {
  Q,
  POST,
} from '../middlewares/query-processor'
import {createOrder} from './orders'
import config from '../config'

let {endpoint} = config.catlog

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
  return {
    type: RESET_SHOPPINGCART,
    [Q]: {
      method: POST,
      path: '/shopping-cart',
      payload: {},
      endpoint,
    },
  }
}
