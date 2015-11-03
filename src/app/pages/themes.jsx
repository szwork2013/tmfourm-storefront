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
        <ThemeApplier onApplyTheme={this.handleApplyTheme} themes={themes}/>
        <ThemeCreator onCreateTheme={this.handleCreateTheme}/>
      </div>
    )
  }

  handleCreateTheme = theme => {

  }

  handleApplyTheme = themeName => {
    let {dispatch} = this.props
    dispatch(applyTheme(themeName))
  }
}
