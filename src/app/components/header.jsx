import {Component} from 'react'
import {Router} from 'react-router'
import {
  Styles,
  Paper,
  Tabs,
  Tab,
  EnhancedButton,
} from 'material-ui'
import Radium from 'radium'
import R from 'ramda'

let {Colors, Spacing, Typography} = Styles

@Radium
export default class Header extends Component {

  render() {
    let {menu, onMenuChange} = this.props
    let {
      root,
      container,
      tabs,
      tab,
      svgLogoContainer,
      svgLogo,
      span,
    } = this.styles
    let homeIcon = false
      ? null
      : (
          <EnhancedButton
            style={svgLogoContainer}
            linkButton={true}
            onTouchTap={onMenuChange.bind(this, menu.home.route)}>
            <img style={svgLogo} src={menu.home.icon}/>
            <span style={span}>{menu.home.label}</span>
          </EnhancedButton>
        )
    return (
      <div>
        <Paper
          zDepth={0}
          rounded={false}
          style={root}>
          {homeIcon}
          <div style={container}>
            <Tabs
              style={tabs}
              value={menu.route}
              onChange={onMenuChange}>
              {
                R.map(({route, label}) => (
                  <Tab
                    key={route}
                    value={route}
                    label={label}
                    style={tab}/>
                ), menu.items)
              }
            </Tabs>
          </div>
        </Paper>
      </div>
    )
  }

  handleTabChange = evt => {

  }

  styles = {
    root: {
      backgroundColor: Colors.cyan500,
      position: 'fixed',
      height: 64,
      top: 0,
      right: 0,
      zIndex: 4,
      width: '100%',
    },
    container: {
      position: 'absolute',
      right: (Spacing.desktopGutter/2) + 48,
      bottom: 0,
    },
    span: {
      color: Colors.white,
      fontWeight: Typography.fontWeightLight,
      left: 80,
      top: 22,
      position: 'absolute',
      fontSize: 26,
    },
    svgLogoContainer: {
      position: 'fixed',
      width: 300,
      left: Spacing.desktopGutter,
    },
    svgLogo: {
      width: 65,
      backgroundColor: Colors.cyan500,
      position: 'absolute',
      top: 5,
    },
    tabs: {
      width: 425,
      bottom:0,
    },
    tab: {
      height: 64,
    },
  }
}
