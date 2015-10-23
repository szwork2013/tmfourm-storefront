import {Component} from 'react'
import {
  Styles,
  AppBar,
  RaisedButton,
} from 'material-ui'
import Radium from 'radium'
import R from 'ramda'

import themes from '../themes'
import {container} from '../styles'
import Header from '../components/header'

let {ThemeManager, ThemeDecorator, Spacing} = Styles
let {desktopKeylineIncrement} = Spacing

@ThemeDecorator(ThemeManager.getMuiTheme(themes))
@Radium
export default class Main extends Component {
  render() {
    let {route, history} = this.props
    return (
      <div style={container}>
        <div style={styles.header}>
          <Header menu={menu(history)} onMenuChange={this.handleMenuChange}/>
        </div>
        <div style={[styles.content]}>
          {this.props.children}
        </div>
      </div>
    )
  }

  handleMenuChange = pathname => {
    this.props.history.pushState(null, pathname)
  }
}

let menu = history => {
  let menu = {
    home: {route: '/home', label: "Storefront", icon: "/images/storefront.jpg"},
    items: [
      {route: '/offers', label: "Product Offerings"},
      {route: '/shoppingcart', label: "Shoppingcart"},
      {route: '/orders', label: "Product Orders"},
    ],
  }
  let activeItem = R.find(item => history.isActive(item.route), menu.items)
  let activeRoute = R.isNil(activeItem) ? '/home' : activeItem.route
  return R.merge(menu, {route: activeRoute})
}

let styles = {
  header: {

  },
  content: {
    marginTop: desktopKeylineIncrement + 6,
  },
}
