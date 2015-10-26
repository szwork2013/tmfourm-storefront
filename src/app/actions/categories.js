import {Q, GET, POST, PUT, DELET, HEAD} from '../middlewares/query-processor'
import config from '../config'

let {endpoint} = config.catlog

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
export function fetchCategories(options) {
  return {
    type: FETCH_CATEGORIES,
    [Q]: {
      method: GET,
      path: '/product-category',
      endpoint,
      options,
    },
  }
}
