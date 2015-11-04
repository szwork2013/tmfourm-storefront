import {Component} from 'react'
import {connect} from 'react-redux'

import {applyTheme} from '../actions/themes'
import ThemeApplier from '../components/theme-applier'
import ThemeCreator from '../components/theme-creator'

@connect(state => {
  let {theme, themes} = state
  return {theme, themes}
})
export default class ThemesPage extends Component {

  render() {
    let {themes, theme} = this.props
    return (
      <div>
        <ThemeApplier onThemeApplied={this.handleThemeApplied} themes={themes}/>
        <ThemeCreator onThemeCreated={this.handleThemeCreated}/>
      </div>
    )
  }

  handleThemeCreated = theme => {

  }

  handleThemeApplied = themeName => {
    let {dispatch} = this.props
    dispatch(applyTheme(themeName))
  }
}
