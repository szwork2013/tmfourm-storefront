import _ from 'ramda'
import fetch from 'isomorphic-fetch'

export const Q = Symbol('query')
export const GET = Symbol('get')
export const POST = Symbol('post')
export const PUT = Symbol('put')
export const DELETE = Symbol('delete')
export const HEAD = Symbol('head')
export const [EQ, LIKE, IN, GT, LT, GE, LE] = ['eq', 'like', 'in', 'gt', 'lt', 'ge', 'le']
export const [REQUEST, SUCCESS, FAILURE] = ['REQUEST', 'SUCCESS', 'FAILURE']
export default config => store => next => action => {
  let q = action[Q]
  if (_.isNil(q)) return next(action)
  else {
    let _action = _.merge(action, {}) //clone aciton without symbol
    let processQuery = query => query
      .then(data => next(success(_.merge(_action, {data}))))
      .catch(error => next(failure({message: error.message || error})))
    next(request(_action))
    let method = q.method || GET
    switch (method) {
      case GET:
        return processQuery(Get(q))
      case POST:
        return processQuery(Post(q))
      case PUT:
        return processQuery(Put(q))
      case DELETE:
        return processQuery(Delete(q))
      case HEAD:
        return processQuery(Head(q))
      default: return next(failure({message: `Unsupported method ${method}`}))
    }
  }
}

let withStatus = status => action => _.merge(action, {status})
let request = withStatus(REQUEST)
let success = withStatus(SUCCESS)
let failure = withStatus(FAILURE)
let paramify = (targetString, params) => {
  if (_.isEmpty(params)) return targetString
  else {
    let [name, value] = _.head(params)
    let resultString = _.replace(
      new RegExp(`\:${name}`, 'g'),
      value,
      targetString
    )
    return paramify(resultString, _.tail(params))
  }
}

let url = (q) => {
  let pathString = _.isNil(q.params) ? q.path : paramify(q.path, q.params)
  let queryString = _.cond([
    [
      _.and(
        _.complement(_.isNil),
        _.is(String),
        _.complement(_.isEmpty)
      ),
      query => `q=${query}`,
    ],
    [
      _.isArrayLike,
      query => {
        let toString = item => _.when(
          _.isArrayLike,
          _.join(',')
        )(item)
        let toQueryString = queryField => _.compose(
          _.trim,
          ([name, op, value]) => `${name} ${op} '${value}'`,
          _.map(toString)
        )(queryField)
        return 'q=' + _.compose(
          _.join(' and '),
          _.map(toQueryString),
          _.filter(qi => !_.isEmpty(_.nth(2, qi)))
        )(q.query)
      },
    ],
    [
      _.T, _.always(''),
    ],
  ])(q.query)
  let optionString = _.compose(
    _.join('&'),
    _.map(([f, v]) => f + '=' + _.when(_.isArrayLike, _.join(','))(v)),
    _.toPairs
  )(_.options || {})
  if (_.isEmpty(queryString) && _.isEmpty(optionString)) {
    return q.endpoint + pathString
  } else if (_.isEmpty(queryString)) {
    return q.endpoint + pathString + '?' + optionString
  } else if (_.isEmpty(optionString)) {
    return q.endpoint + pathString + '?' + queryString
  } else {
    return q.endpoint + pathString + '?' + queryString + '&' + optionString
  }
}

let Get = async function(q) {
  return await fetch(url(q), {
    method: 'get',
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
}

let Post = async function(q) {
  return await fetch(url(q), {
    method: 'post',
    headers: {
      'Cache-Control': 'no-cache',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(q.payload),
  }).then(res => res.json())
}

let Put = async function(q) {
  return await fetch(url(q), {
    method: 'put',
    body: q.payload,
  }).then(res => res.json())
}

let Delete = async function(q) {
  return await fetch(url(q), {
    method: 'delete',
  }).then(res => res.json())
}

let Head = async function(q) {
  return await fetch(url(q), {
    method: 'head',
  }).then(res => res.json())
}
