import R from 'ramda'
import combineReducers from 'redux'

import {
  RESET_FILTERS,
  FETCH_OFFERS,
  VIEW_OFFER,
} from '../actions/offers'
import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../middlewares/query-processor'

export function offers(state = {
  data: [],
}, action) {
  let {type, status, filters, options, data, message} = action
  if (type === FETCH_OFFERS) {
    switch (action.status) {
      case REQUEST:
        return R.merge(state, {filters, options})
      case SUCCESS:
        return R.merge(state, {filters, options, data})
      case FAILURE:
        return state
      default: return R.merge(state, {filters, options, message})
    }
  } else return state
}

export function offer(state = null, action) {
  switch(action.type) {
    case VIEW_OFFER: return action.offer
    default: return state
  }
}
