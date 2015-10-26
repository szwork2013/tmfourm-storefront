import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import storefrontApp from '../reducers'
import QueryProcessor from '../middlewares/query-processor'

let createStoreWithMiddleware = applyMiddleware(
  thunk,
  QueryProcessor(),
)(createStore)
export default config => {
  return createStoreWithMiddleware(storefrontApp)
}
