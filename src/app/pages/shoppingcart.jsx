import {Component} from 'react'
import {connect} from 'react-redux'
import {
  List,
  ListItem,
} from 'material-ui'
import R from 'ramda'
import Radium from 'radium'

import Shoppingcart from '../components/shoppingcart'
import {submitShoppingcart, resetShoppingcart} from '../actions/shoppingcart'
import {grid, gridGutters, gridCenter, cell, cellCenter} from '../styles'

@connect(state => {
  return {shoppingcart: state.shoppingcart}
})
export default class ShoppingcartPage extends Component {

  render() {
    let {history, dispatch, shoppingcart} = this.props
    let handleSubmit = shoppingcart => {
      dispatch(submitShoppingcart())
      history.pushState(null, '/orders')
    }
    let ok = R.both(
      R.complement(R.isNil),
      R.complement(R.isEmpty)
    )
    return (
      <div>
        {
          R.cond([
            [R.compose(ok, R.props('items')), () => (
              <Shoppingcart shoppingcart={shoppingcart} onSubmit={handleSubmit}/>
            )],
            [R.T, () => (
              <div>
                <img src="/images/empty-cart.gif"/>
              </div>
            )],
          ])(shoppingcart)
        }
      </div>
    )
  }

  componentWillMount() {
    let {shoppingcart, dispatch} = this.props
    if (R.isNil(shoppingcart._id)) dispatch(resetShoppingcart())
  }
}
