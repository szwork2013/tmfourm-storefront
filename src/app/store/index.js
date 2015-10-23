import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import storefrontApp from '../reducers'

let createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore)
export default config => {
  return createStoreWithMiddleware(storefrontApp)
}
