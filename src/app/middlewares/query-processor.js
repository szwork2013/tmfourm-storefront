/**
type Query {
  m: {
    type: String,
    default: GET,
    emum: [GET, POST, PUT, DELETE]
  },
  op: String,
  q: Pair
  p: Any
}
*/
import R from 'ramda'

export const Q = Symble('query')
export default QueryProcessor = () => store => next => action => {
  let query = action[Q]
  if (R.isNil(query)) return next(action)
  else {
    let {type} = action
    next()
  }

}
