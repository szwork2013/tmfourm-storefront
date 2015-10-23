import R from 'ramda'

export let matrixfy = cols => list => {
  let delta = cols - (R.length(list) % cols)
  let toEmpty = n => []
  let line = R.range(0, cols)
  let acc = R.map(toEmpty, line)
  return R.compose(
    R.map(R.flatten),
    R.reduce(R.zip, acc),
    R.splitEvery(cols),
    R.concat(list),
    R.map(toEmpty),
    R.range(0)
  )(delta)
}
