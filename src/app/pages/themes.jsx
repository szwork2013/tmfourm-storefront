import {Component} from 'react'
import {
  Paper,
  TextField,
  SelectField,
  Styles,
  Utils,
} from 'material-ui'
import {connect} from 'react-redux'

import themes from '../themes'
import {changeTheme} from '../actions/themes'

let {Colors, Spacing} = Styles
let {ColorManipulator} = Utils
@connect(state => {
  let {theme} = state
  return {theme}
})
export default class ThemesPage extends Component {

  render() {
    return (
      <div>
        <p> Change theme </p>
        <SelectField
          onChange={this.handleThemeChange}
          menuItems={menuItems}/>
      </div>
    )
  }

  handleThemeChange = (evt, idx, theme) => {
    let {dispatch} = this.props
    let muiTheme = theme.payload
    dispatch(changeTheme(muiTheme))
    this.setState({muiTheme})
  }
}

let menuItems = [
  {
    payload: themes({
      palette: {
        primary1Color: Colors.cyan500,
        primary2Color: Colors.cyan700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.pinkA200,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
      },
    }),
    text: 'Light',
  },
  {
    payload: themes({
      palette: {
        primary1Color: Colors.brown500,
        primary2Color: Colors.brown700,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.deepPurpleA200,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
      },
    }),
    text: 'Dark',
  },
]
