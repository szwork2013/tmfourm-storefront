import R from 'ramda'
import combineReducers from 'redux'

import {
  RESET_FILTERS,
  FETCH_OFFERS,
  FETCH_OFFER,
} from '../actions/offers'
import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../middlewares/query-processor'

export function offers(state = {
  data: [],
  filters: {},
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
  let {type, status, data} = action
  switch(type) {
    case FETCH_OFFER:
      switch (status) {
        case REQUEST: return state
        case SUCCESS: return data
        case FAILURE: return null
        default: return state

      }
    default: return state
  }
}
