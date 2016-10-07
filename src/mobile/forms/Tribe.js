import React, {Component, PropTypes} from 'react'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import {Field} from 'redux-form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'

import form from '../../common/forms/tribe'
import submitTribe from '../../common/actions/submitTribe'
import currencies from '../../common/constants/currencies'

import {TRIBE_TYPES} from '../../common/constants/product'

const types = TRIBE_TYPES.map((type) => ({code: type}))

class TribeForm extends Component {
  static propTypes = {
    // from parent:
    type: PropTypes.string.isRequired,
    // from redux-form:
    initialize: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
  }

  //TODO: solve same-page issue (reinitialize form when remounting)

  render() {
    const {type, ...props} = this.props

    return (
      <ScrollView ref="sv">
        <Form name={'tribe.' + type} action={submitTribe} {...props}>
          <Field
            name="tribe_name"
            component={TextField}
            autoCorrect={false}
          />
          <Field
            name="tribe_type"
            component={SelectField}
            items={types}
          />
          <Field
            name="city"
            component={CityField}
            ref="city"
            onFocus={() => this.refs.sv.scrollFocus(this.refs.city, 380)}
          />
          <Field
            name="currency"
            component={SelectField}
            items={currencies}
          />
        </Form>
      </ScrollView>
    )
  }
}

export default form(TribeForm)
