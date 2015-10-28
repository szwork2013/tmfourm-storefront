import R from 'ramda'

let set = (key, value) => {
  if (!R.isNil(key) && !R.isNil(value))
    localStorage.setItem(key, JSON.stringify(value))
}

let get = (key) => {
  if (!R.isNil(key)) {
    let value = localStorage.getItem(key)
    if (!R.isNil(value)) return JSON.parse(value)
    else return null
  } else return null
}

export default {set, get}
