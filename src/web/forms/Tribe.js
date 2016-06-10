import React, {Component, PropTypes} from 'react'

import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'

import form from '../../common/forms/tribe'
import focus from '../../common/utils/formFocus'
import submitTribe from '../../common/actions/submitTribe'
import currencies from '../../common/resources/currencies'
import {TRIBE_TYPES} from '../../common/constants/product'

const currencyItems = currencies.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={`${item.name} (${item.code})`} />
)
const typeItems = TRIBE_TYPES.map((type) =>
  <MenuItem value={type} key={type} primaryText={type} />
)

class TribeForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitTribe)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {tribe_name, tribe_type, city, currency}} = this.props

    return (
      <Form name={'tribe.' + this.props.type} onSubmit={this.handleSubmit} {...this.props}>
        <TextField ref="tribe_name"
          required={true}
          {...tribe_name}
        />
        <SelectField ref="tribe_type"
          {...tribe_type}
        >
          {typeItems}
        </SelectField>
        <CityField ref="city"
          required={true}
          {...city}
        />
        <SelectField ref="currency"
          {...currency}
        >
          {currencyItems}
        </SelectField>
      </Form>
    )
  }
}

TribeForm.propTypes = {
  // from parent component:
  type: PropTypes.string.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  // from redux:
  initialValues: PropTypes.object,
}

export default form(TribeForm)
