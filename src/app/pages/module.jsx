import {Component} from 'react'

export default class Module extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
