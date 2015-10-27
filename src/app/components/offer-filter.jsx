import {Component} from 'react'
import {
  RadioButtonGroup,
  RadioButton,
  TextField,
} from 'material-ui'
import R from 'ramda'

export default class OfferFilter extends Component {

  render() {
    let {offers, categories, selectedCategory, onCategoryChange} = this.props
    let renderCategoryFilter = ({_id, name}) => (
      <RadioButton
        key={_id}
        value={_id}
        label={name}/>
    )
    return (
      <div>
        <div>
          <TextField hintText="Enter Offer Name" floatingLabelText="Filter by offer name"/>
        </div>
        <div><p>Filter by category</p></div>
        <div>
          <RadioButtonGroup
            name="categoryFilters"
            defaultSelected={selectedCategory || ''}
            onChange={onCategoryChange}>
            {R.map(renderCategoryFilter, categories)}
          </RadioButtonGroup>
        </div>
      </div>
    )
  }
}
