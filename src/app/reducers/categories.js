import R from 'ramda'
import uuid from 'uuid'

import {FETCH_CATEGORIES} from '../actions/categories'
import {REQUEST, SUCCESS, FAILURE} from '../middlewares/query-processor'

export function categories(state = [], action) {
  if (action.type === FETCH_CATEGORIES) {
    switch (action.status) {
      case REQUEST:
        return state
      case SUCCESS:
        return action.data
      case FAILURE:
        return state
      default: return state
    }
  } else return state
}
