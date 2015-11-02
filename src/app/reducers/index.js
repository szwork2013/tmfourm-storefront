import {combineReducers} from 'redux'

import {offers, offer} from './offers'
import {orders} from './orders'
import {shoppingcart} from './shoppingcart'
import {categories} from './categories'
import {theme, themes} from './themes'

export default combineReducers({
  categories,
  offers,
  offer,
  orders,
  shoppingcart,
  theme,
  themes,
})
