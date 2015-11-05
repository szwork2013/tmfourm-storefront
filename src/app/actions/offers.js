import R from 'ramda'
import {
  Q,
  GET,
  POST,
  EQ,
  LIKE,
} from '../middlewares/query-processor'
import config from '../config'

let {endpoint} = config.catlog

export const FETCH_OFFERS = 'FETCH_OFFERS'
export function fetchOffers(name, category, options) {
  return {
      type: FETCH_OFFERS,
      filters: {name, category},
      options,
      [Q]: {
        path: '/product-offering',
        query: [
          ['name', LIKE, name],
          ['category._id', EQ, category],
        ],
        endpoint,
        options,
      },
    }
}

export const FETCH_OFFER = 'FETCH_OFFER'
export function fetchOffer(_id, options) {
  return {
    type: FETCH_OFFER,
    [Q]: {
      path: '/product-offering/:_id',
      params: {_id},
      endpoint,
      options,
    },
  }
}

export const CHANGE_CHARACTERISTIC = 'CHANGE_CHARACTERISTIC'
export function changeCharacteristic(offer, name, value) {
  //TODO hard code price change, should be changed later
  R.forEach(({price}) => {
    price.dutyFreeAmount = 100 + 10 * Math.floor(Math.random() * 5)
  }, offer.produtOfferingPrice)
  return {
    type: CHANGE_CHARACTERISTIC,
    data: offer,
  }
}

export const FETCH_OFFER_DOCUMENT = 'FETCH_OFFER_DOCUMENT'
export function fetchOfferDocument(_id, options) {
  return {
    type: FETCH_OFFER_DOCUMENT,
    [Q]: {
      path: '/Offer',
      endpoint: config.cms.endpoint,
    },
  }
}
