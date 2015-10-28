import {Component} from 'react'
import R from 'ramda'
import Radium from 'radium'
import {
  Styles,
  Avatar,
  FlatButton,
  RaisedButton,
} from 'material-ui'

import {grid} from '../styles'

let {Colors} = Styles

@Radium
export default class OrderList extends Component {

  render() {
    let {orders} = this.props
    return (
      <div>
        <div style={[grid.grid, styles.header]}>
          <div style={[grid.cell]}>
            <p>Order Description</p>
          </div>
          <div style={[grid.cell, grid.u1of6]}>
            <p>Total Amount</p>
          </div>
          <div style={[grid.cell, grid.u1of6]}>
            <p>Order Status</p>
          </div>
          <div style={[grid.cell, grid.u1of6]}>
            <p>Action</p>
          </div>
        </div>
        {
          R.map(order => (
            <div key={order._id} style={[styles.order]}>
              <div style={[grid.grid, styles.orderHeader]}>
                <div style={[grid.cell]}>
                  <p>Order: {order._id}</p>
                </div>
              </div>
              <div style={[grid.grid]}>
                <div style={[grid.cell]}>
                  {
                    R.map(({_id, productOffering}) => (
                      <div key={_id} style={[grid.grid]}>
                        <div style={[grid.cell, grid.cellCenter, grid.u1of12]}>
                          <Avatar src={"//place-hold.it/200/CDDC39/fff&fontsize=24&text=" + productOffering.name} />
                        </div>
                        <div style={[grid.cell, grid.cellCenter]}>
                          <p>{productOffering.name}</p>
                        </div>
                        <div style={[grid.cell, grid.cellCenter]}>
                          <p>{"x1"}</p>
                        </div>
                      </div>
                    ), order.items)
                  }
                </div>
                <div style={[grid.cell, grid.u1of6, grid.cellCenter]}>
                  0
                </div>
                <div style={[grid.cell, grid.u1of6, grid.cellCenter]}>
                  Completed
                </div>
                <div style={[grid.cell, grid.u1of6, grid.cellCenter]}>
                  <RaisedButton label="Buy More" primary={true}/>
                </div>
              </div>
            </div>
          ), orders)
        }
      </div>
    )
  }
}

let styles = {
  header: {
    color: Colors.grey500,
    background: Colors.grey100,
  },
  order: {
    marginTop: 10,
    border: `1px solid ${Colors.grey100}`,
  },
  orderHeader: {
    color: Colors.grey500,
    background: Colors.grey100,
  },
}
