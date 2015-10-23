import R from 'ramda'

import {
  CREATE_ORDER,
} from '../actions/order'

export function orders(state = [], action) {
  let {type, order} = action
  switch (type) {
    case CREATE_ORDER: return R.prepend(order, state)
    default: return state
  }
}
