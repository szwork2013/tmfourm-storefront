import {Component} from 'react'
import {Styles, ClearFix} from 'material-ui'
import Radium from 'radium'

let {DesktopGutter} = Styles.Spacing

@Radium
export default class Section extends Component {

  render() {
    return (
      <ClearFix style={this.styles.root}>
        <div style={this.styles.content}>
          {this.props.children}
        </div>
      </ClearFix>
    )
  }

  styles = {
    root: {
      padding: DesktopGutter,
      boxSizing: 'border-box',
    },
    content: {
      maxWidth: 1200,
      margin: '0 auto',
    },
  }

}
