import R from 'ramda'

import {
  FETCH_ORDERS,
} from '../actions/orders'

import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../middlewares/query-processor'

export function orders(state = [], action) {
  let {type, data, status} = action
  switch (type) {
    case FETCH_ORDERS:
      switch (status) {
        case REQUEST:
          return state
        case SUCCESS:
          return data
        case FAILURE:
          return state
        default: return state
      }
    default: return state
  }
}
