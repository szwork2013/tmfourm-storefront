import lorem from 'lorem-ipsum'
import uuid from 'uuid'
let l = count => lorem({count})

export const VIEW_OFFER = 'VIEW_OFFER'
export function viewOffer(offer) {
  return {
    type: 'VIEW_OFFER',
    offer,
  }
}
export function fetchOffer(id) {
  return dispatch => {
    // TODO
  }
}
