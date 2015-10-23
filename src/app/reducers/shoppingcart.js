import R from 'ramda'
import uuid from 'uuid'

import {
  ADD_TO_SHOPPINGCART,
  RESET_SHOPPINGCART,
} from '../actions/shoppingcart'

export function shoppingcart(state = {
  _id: uuid(),
  items: [],
}, action) {
  switch (action.type) {
    case ADD_TO_SHOPPINGCART:
      let items = R.prepend(action.item, state.items)
      return R.merge(state, {items})
    case RESET_SHOPPINGCART:
      return action.shoppingcart
    default: return state
  }
}
