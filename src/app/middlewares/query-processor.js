import R from 'ramda'
import fetch from 'isomorphic-fetch'

import storage from '../storage'

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
  if (R.isNil(q)) return next(action)
  else {
    let _action = R.merge(action, {}) //clone aciton without symbol
    let processQuery = query => query
      .then(data => {
        if (!R.isNil(q.cache)) storage.set(q.cache, data)
        if (!R.isNil(q.onSuccess)) q.onSuccess(data)
        next(success(R.merge(_action, {data})))
      })
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

let withStatus = status => action => R.merge(action, {status})
let request = withStatus(REQUEST)
let success = withStatus(SUCCESS)
let failure = withStatus(FAILURE)

let paramify = (targetString, params) => {
  let doParamify = (targetString, params) => {
    if (R.isEmpty(params)) return targetString
    else {
      let [name, value] = R.head(params)
      let resultString = R.replace(
        new RegExp(`\:${name}`, 'g'),
        value,
        targetString
      )
      return doParamify(resultString, R.tail(params))
    }
  }
  return R.cond([
    [R.is(Object), params => doParamify(targetString, R.toPairs(params))],
    [R.isArrayLike, params => doParamify(targetString, params)],
    [R.T, R.always(targetString)],
  ])(params)
}

let url = (q) => {
  let pathString = R.isNil(q.params) ? q.path : paramify(q.path, q.params)
  let queryString = R.cond([
    [
      R.and(
        R.complement(R.isNil),
        R.is(String),
        R.complement(R.isEmpty)
      ),
      query => `q=${query}`,
    ],
    [
      R.isArrayLike,
      query => {
        let toString = item => R.when(
          R.isArrayLike,
          R.join(',')
        )(item)
        let toQueryString = queryField => R.compose(
          R.trim,
          ([name, op, value]) => `${name} ${op} '${value}'`,
          R.map(toString)
        )(queryField)
        let notNilNorEmpty = R.both(
          R.complement(R.isNil),
          R.complement(R.isEmpty)
        )
        let getValue = R.nth(2)
        return 'q=' + R.compose(
          R.join(' and '),
          R.map(toQueryString),
          R.filter(qi => notNilNorEmpty(getValue(qi)))
        )(q.query)
      },
    ],
    [
      R.T, R.always(''),
    ],
  ])(q.query)
  let optionString = R.compose(
    R.join('&'),
    R.map(([f, v]) => f + '=' + R.when(R.isArrayLike, R.join(','))(v)),
    R.toPairs
  )(R.options || {})
  if (R.isEmpty(queryString) && R.isEmpty(optionString)) {
    return q.endpoint + pathString
  } else if (R.isEmpty(queryString)) {
    return q.endpoint + pathString + '?' + optionString
  } else if (R.isEmpty(optionString)) {
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
