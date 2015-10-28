import {Component} from 'react'
import {connect} from 'react-redux'
import {
  List,
  ListItem,
} from 'material-ui'
import R from 'ramda'
import Radium from 'radium'

import Shoppingcart from '../components/shoppingcart'
import {submitShoppingcart, loadShoppingcart} from '../actions/shoppingcart'
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
    let notNil = R.complement(R.isNil)
    let notEmpty = R.complement(R.isEmpty)
    let hasItems = R.compose(R.both(notNil, notEmpty), R.prop('items'))
    let isInitialized = R.both(notNil, hasItems)
    let renderShoppingcart = sc => <Shoppingcart
      shoppingcart={sc}
      onSubmit={handleSubmit}/>
    let renderEmptyShoppingcart = () => (
      <div>
        <img src="/images/empty-cart.gif"/>
      </div>
    )
    return (
      <div>
        {
          R.cond([
            [isInitialized, renderShoppingcart],
            [R.T, renderEmptyShoppingcart],
          ])(shoppingcart)
        }
      </div>
    )
  }

  componentWillMount() {
    let {shoppingcart, dispatch} = this.props
    dispatch(loadShoppingcart())
  }
}
