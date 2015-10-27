import {Component} from 'react'
import {
  RadioButtonGroup,
  RadioButton,
  TextField,
} from 'material-ui'
import R from 'ramda'

export default class OfferFilter extends Component {

  render() {
    let {
      offers,
      categories,
      selectedCategory,
      onCategoryChange,
      onOfferNameChange,
    } = this.props
    let renderCategoryFilter = ({_id, name}) => (
      <RadioButton key={_id} value={_id} label={name}/>
    )
    return (
      <div>
        <div>
          <TextField
            hintText="Enter offering name"
            floatingLabelText="Filter offerings by name"
            onChange={onOfferNameChange}/>
        </div>
        <div><p>Filter offerings by category</p></div>
        <div>
          <RadioButtonGroup
            name="categoryFilters"
            defaultSelected={selectedCategory || ''}
            onChange={onCategoryChange}>
              <RadioButton value="" label="All offerings"/>
                {R.map(renderCategoryFilter, categories)}
          </RadioButtonGroup>
        </div>
      </div>
    )
  }
}
