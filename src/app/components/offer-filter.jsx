import {Component} from 'react'
import {
  List,
  ListItem,
  Checkbox,
  TextField,
} from 'material-ui'
import R from 'ramda'

export default class OfferFilter extends Component {

  render() {
    let {offers} = this.props
    let {categories} = this.props
    let renderCategoryFilter = ({_id, name}) => (
      <ListItem
        key={_id}
        primaryText={name}
        leftCheckbox={
          <Checkbox
            value={_id}
            onCheck={this.handleCategoryFilterChange}/>
        }/>
    )
    return (
      <List>
        <ListItem>
          <TextField hintText="Enter Offer Name" floatingLabelText="Offer Name"/>
        </ListItem>
        <ListItem primaryText="Filter By Category"/>
        {R.map(renderCategoryFilter, categories)}
      </List>
    )
  }
}
