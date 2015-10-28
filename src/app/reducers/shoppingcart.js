import R from 'ramda'
import uuid from 'uuid'

import {
  FETCH_SHOPPINGCART,
  LOAD_SHOPPINGCART,
  CREATE_SHOPPINGCART,
} from '../actions/shoppingcart'
import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../middlewares/query-processor'

export function shoppingcart(state = {}, action) {
  switch (action.type) {
    case FETCH_SHOPPINGCART:
      switch(action.status) {
        case REQUEST: return state
        case SUCCESS:
          return action.data
        case FAILURE:
          return {}
        default: return state
      }
    case LOAD_SHOPPINGCART:
      return action.data
    case CREATE_SHOPPINGCART:
      switch(action.status) {
        case REQUEST: return state
        case SUCCESS:
          return action.data
        case FAILURE:
          return {}
        default: return state
      }
    default: return state
  }
}
