import R from 'ramda'

import storage from '../storage'
import {
  Q,
  GET,
  POST,
  SUCCESS,
} from '../middlewares/query-processor'
import config from '../config'
let {endpoint} = config.catlog
let cache = "shoppingcart"

export const ADD_TO_SHOPPINGCART = 'ADD_TO_SHOPPINGCART'
export function addToShoppingcart(productOffering) {
  return (dispatch, getState) => {
    let {_id} = getState().shoppingcart
    let action = 'ADD'
    let payload = {action, productOffering}
    dispatch({
      type: ADD_TO_SHOPPINGCART,
      [Q]: {
        method: POST,
        path: '/shopping-cart/:_id/shopping-cart-item',
        params: [['_id', _id]],
        payload,
        endpoint,
        onSuccess: data => dispatch(fetchShoppingcart(_id)),
      },
    })
  }
}

export const SUBMIT_SHOPPINGCART = 'SUBMIT_SHOPPINGCART'
export function submitShoppingcart() {
  return (dispatch, getState) => {
    let {_id} = getState().shoppingcart
    dispatch({
      type: SUBMIT_SHOPPINGCART,
      [Q]: {
        method: POST,
        path: '/shopping-cart/:_id/submit',
        params: [['_id', _id]],
        payload: {},
        endpoint,
        onSuccess: data => {
          dispatch(createShoppingcart())
        },
      },
    })
  }
}

export const FETCH_SHOPPINGCART = 'FETCH_SHOPPINGCART'
export function fetchShoppingcart(_id) {
  return {
    type: FETCH_SHOPPINGCART,
    [Q]: {
      method: GET,
      path: '/shopping-cart/:_id',
      params: [['_id', _id]],
      endpoint,
      cache,
    },
  }
}

export const LOAD_SHOPPINGCART = 'LOAD_SHOPPINGCART'
export function loadShoppingcart() {
  return dispatch => {
    let shoppingcart = storage.get(cache)
    let notNil = R.complement(R.isNil)
    let isValidate = R.allPass([
      notNil,
      R.compose(notNil, R.prop('_id')),
      R.complement(R.propEq('state', 'SUBMITTED')),
    ])
    if (isValidate(shoppingcart)) dispatch({
      type: LOAD_SHOPPINGCART,
      data: shoppingcart,
    })
    else dispatch(createShoppingcart())
  }
}

export const CREATE_SHOPPINGCART = 'CREATE_SHOPPINGCART'
export function createShoppingcart() {
  return {
    type: CREATE_SHOPPINGCART,
    [Q]: {
      method: POST,
      path: '/shopping-cart',
      payload: {},
      endpoint,
      cache,
    },
  }
}
