import R from 'ramda'

import {
  Q,
  POST,
} from '../middlewares/query-processor'
import config from '../config'

let {endpoint} = config.catlog

export const FETCH_ORDERS = 'FETCH_ORDERS'
export function fetchOrders(options) {
  return {
    type: FETCH_ORDERS,
    [Q]: {
      path: '/product-order',
      endpoint,
      options,
    },
  }
}
export const CREATE_ORDER = 'CREATE_ORDER'
export function oneClickBuy(productOffering) {
  return dispatch => dispatch({
    type: CREATE_ORDER,
    [Q]: {
      method: POST,
      path: '/product-order',
      payload: {
        items: [{productOffering}],
      },
      endpoint,
      onSuccess: data => dispatch(fetchOrders()),
    },
  })
}
