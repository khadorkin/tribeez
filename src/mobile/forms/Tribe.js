import React, {Component, PropTypes} from 'react'

import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'

import currencies from '../../common/resources/currencies'
import {TRIBE_TYPES} from '../../common/constants/product'
const types = TRIBE_TYPES.map((type) => ({name: type, code: type})) //TODO: translate

import validator from '../../common/utils/formValidator'

import submitTribe from '../../common/actions/submitTribe'

class TribeForm extends Component {
  static propTypes = {
    // from parent:
    type: PropTypes.string.isRequired,
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    initialValues: PropTypes.object,
  }

  render() {
    const {fields: {tribe_name, tribe_type, city, currency}, ...props} = this.props

    return (
      <Form name={'tribe.' + this.props.type} action={submitTribe} {...props}>
        <TextField
          {...tribe_name}
          autoCorrect={false}
        />
        <SelectField
          {...tribe_type}
          items={types}
        />
        <CityField
          {...city}
        />
        <SelectField
          {...currency}
          items={currencies}
        />
      </Form>
    )
  }
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
  validate: validator.tribe,
  touchOnBlur: false,
}, mapStateToProps)(TribeForm)
