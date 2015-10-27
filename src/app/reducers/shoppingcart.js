import R from 'ramda'
import uuid from 'uuid'

import {
  ADD_TO_SHOPPINGCART,
  RESET_SHOPPINGCART,
} from '../actions/shoppingcart'
import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../middlewares/query-processor'

export function shoppingcart(state = localStorage.getItem('shoppingcart') || {}, action) {
  switch (action.type) {
    case ADD_TO_SHOPPINGCART:
      let items = R.prepend(action.item, state.items)
      return R.merge(state, {items})
    case RESET_SHOPPINGCART:
      switch(action.status) {
        case REQUEST: return state
        case SUCCESS: return action.data
        case FAILURE: return state
        default: return state
      }
    default: return state
  }
}
