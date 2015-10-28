import {Component} from 'react'
import {
  RadioButtonGroup,
  RadioButton,
  TextField,
  Paper,
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
        <Paper style={{padding: 10}} zDepth={3}>
          <TextField
            hintText="Enter offering name"
            floatingLabelText="Filter offerings by name"
            onChange={onOfferNameChange}/>
        </Paper>
        <Paper style={{padding: 10}} zDepth={3}>
          <p>Filter offerings by category</p>
          <RadioButtonGroup
            name="categoryFilters"
            defaultSelected={selectedCategory || ''}
            onChange={onCategoryChange}>
              <RadioButton value="" label="All offerings"/>
                {R.map(renderCategoryFilter, categories)}
          </RadioButtonGroup>
        </Paper>
      </div>
    )
  }
}
