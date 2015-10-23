import R from 'ramda'
import uuid from 'uuid'

export function categories(state = [
  {
    _id: '1',
    name: 'Smart Phone',
  },
  {
    _id: '2',
    name: 'Touch Pad',
  },
  {
    _id: '3',
    name: 'Televersion',
  },
], action) {
  return state
}
