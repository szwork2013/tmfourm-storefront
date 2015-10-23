import {Component} from 'react'
import {connect} from 'react-redux'
import {
  List,
  ListItem,
} from 'material-ui'
import R from 'ramda'

import OrderList from '../components/order-list'

@connect(state => {
  return {orders: state.orders}
})
export default class OrdersPage extends Component {

  render() {
    let {orders} = this.props
    return (
      <div>
        {
          R.isEmpty(orders)
            ? <h1>No orders found</h1>
            : <OrderList orders={orders}/>
        }
      </div>
    )
  }
}
