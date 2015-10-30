import {Component, PropTypes} from 'react'
import {
  Styles,
  AppBar,
  RaisedButton,
} from 'material-ui'
import Radium from 'radium'
import R from 'ramda'
import {connect} from 'react-redux'

import themes from '../themes'
import {container} from '../styles'
import Header from '../components/header'
import {changeTheme} from '../actions/themes'

let {ThemeManager, ThemeDecorator, Spacing} = Styles
let {desktopKeylineIncrement} = Spacing

@connect(state => {
  let {shoppingcart, theme} = state
  return {shoppingcart, theme}
})
export default class Main extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object,
  }

  render() {
    let {route, history, shoppingcart, theme} = this.props
    return (
      <div style={container}>
        <div style={styles.header}>
          <Header
            menu={menu(history, shoppingcart)}
            onMenuChange={this.handleMenuChange}/>
        </div>
        <div style={styles.content}>
          {this.props.children}
        </div>
      </div>
    )
  }

  getChildContext() {
    let {theme} = this.props
    return {
      muiTheme: ThemeManager.getMuiTheme(themes(theme)),
    }
  }

  handleThemeChange = (evt, idx, themeItem) => {
    let {dispatch} = this.props
    dispatch(changeTheme(themeItem.payload))
  }

  handleMenuChange = pathname => {
    this.props.history.pushState(null, pathname)
  }
}

let menu = (history, shoppingcart) => {
  let items = shoppingcart.items || []
  let count = items.length || ''
  let menu = {
    home: {route: '/home', label: "Storefront", icon: "/images/storefront.jpg"},
    items: [
      {route: '/offers', label: "Product Offerings"},
      {route: '/shoppingcart', label: "Shoppingcart " + count},
      {route: '/orders', label: "Product Orders"},
      {route: '/themes', label: "Personalize Theme"},
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
