import {Component} from 'react'
import R from 'ramda'
import Radium from 'radium'
import {
  Paper,
  RaisedButton,
} from 'material-ui'

import {matrixfy} from '../utils'
import {grid} from '../styles'

@Radium
export default class OfferList extends Component {

  render() {
    let {offers, onViewDetail, onOrder, onAddToCart} = this.props
    let cols = this.state.cols || getCols()
    let renderOffer = offer => (
      <div key={offer._id} style={{paddingTop: '2em'}}>
        <Paper zDepth={1}>
          <img style={{width: '100%'}} src={"//place-hold.it/200/CDDC39/fff&fontsize=24&text=" + offer.name}/>
          <RaisedButton label="View Offer" style={{width: '100%'}}
            onClick={onViewDetail.bind(this, offer)}/>
          <RaisedButton label="One Click Buy" style={{width: '100%'}} primary={true}
            onClick={onOrder.bind(this, offer)}/>
          <RaisedButton label="Add to cart" style={{width: '100%'}}
            onClick={onAddToCart.bind(this, offer)}/>
        </Paper>
      </div>
    )
    let renderColumn = (column, idx) => (
      <div key={idx} style={[grid.cell, grid.cellGutters]}>
        {R.map(renderOffer, column)}
      </div>
    )
    let renderOffers = R.compose(
      R.addIndex(R.map)(renderColumn),
      matrixfy(cols)
    )
    return (
      <div style={[grid.grid, grid.gridGutters]}>
        {renderOffers(offers)}
      </div>
    )
  }

  componentWillMount() {
    console.log('mount')
    window.onresize = () => {
      console.log('xxxxx')
      this.setState({cols: getCols()})
    }
  }

  componentWillUnmount() {
    console.log('unmount')
    window.onresize = null
  }
}

let getCols = () => Math.floor(window.screen.width / 200)
