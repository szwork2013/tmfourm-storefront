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
export const GET = Symble('GET')
export const POST = Symble('POST')
export const PUT = Symble('PUT')
export const DELETE = Symble('DELETE')
export const HEAD = Symble('HEAD')
export function fetch(query) {
  let {m, p, q, op} = query
  return dispatch => {

  }
}
