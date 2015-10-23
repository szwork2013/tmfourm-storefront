import {Component} from 'react'
import {connect} from 'react-redux'
import {
  List,
  ListItem,
} from 'material-ui'
import R from 'ramda'

import Shoppingcart from '../components/shoppingcart'
import {submitShoppingcart} from '../actions/shoppingcart'

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
    return (
      <div>
        {R.isEmpty(shoppingcart.items) &&
          <h1>Shoppingcart is empty!!!</h1>
        }
        {!R.isEmpty(shoppingcart.items) &&
          <Shoppingcart shoppingcart={shoppingcart} onSubmit={handleSubmit}/>
        }
      </div>
    )
  }
}
