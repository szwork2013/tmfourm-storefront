import R from 'ramda'
import uuid from 'uuid'
import lorem from 'lorem-ipsum'

import {
  VIEW_OFFER,
} from '../actions/offers'

let initOffers = R.compose(
  R.map(idx => ({
    _id: uuid(),
    name: `Smart phone - ${idx}`,
    description: lorem({count: 36}),
    attachments: R.compose(
      R.map(idx => ({
        _id: uuid(),
        name: lorem({count: 1}),
        description: lorem({count: 36}),
      })),
      R.range(1)
    )(4),
  })),
  R.range(1)
)(50)

export function offers(state = initOffers, action) {
  return state
}

export function offer(state = null, action) {
  switch(action.type) {
    case VIEW_OFFER: return action.offer
    default: return state
  }
}
