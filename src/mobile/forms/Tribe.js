import React, {Component, PropTypes} from 'react'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'

import form from '../../common/forms/tribe'
import submitTribe from '../../common/actions/submitTribe'
import currencies from '../../common/resources/currencies'

import {TRIBE_TYPES} from '../../common/constants/product'

const types = TRIBE_TYPES.map((type) => ({code: type}))

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
      <ScrollView>
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
      </ScrollView>
    )
  }
}

export default form(TribeForm)
