import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form'

import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'

import currencies from '../../common/resources/currencies'
import {TRIBE_TYPES} from '../../common/constants/product'

import validator, {focus} from '../../common/utils/formValidator'

import submitTribe from '../../common/actions/submitTribe'

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

const mapStateToProps = (state, ownProps) => {
  const initialValues = {
    currency: state.member.tribe.currency,
  }
  if (ownProps.type === 'update') {
    initialValues.tribe_name = state.member.tribe.name
    initialValues.tribe_type = state.member.tribe.type
    initialValues.city = {
      name: state.member.tribe.city,
      country_code: state.member.tribe.country_code,
      place_id: state.member.tribe.place_id,
    }
    initialValues.id = state.member.tribe.id
  }
  return {
    initialValues,
  }
}

export default reduxForm({
  form: 'tribe',
  fields: ['id', 'tribe_name', 'tribe_type', 'city', 'currency'],
  returnRejectedSubmitPromise: true,
  validate: validator.tribe,
}, mapStateToProps)(TribeForm)
