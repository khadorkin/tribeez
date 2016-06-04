import React, {Component, PropTypes} from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'

import {reduxForm} from 'redux-form'

import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import CityField from '../components/CityField'
import FormattedMessage from '../components/FormattedMessage'
import Button from '../components/Button'

import currencies from '../../common/resources/currencies'
import {TRIBE_TYPES} from '../../common/constants/product'
const types = TRIBE_TYPES.map((type) => ({name: type, code: type}))

import validator from '../../common/utils/formValidator'

import submitTribe from '../../common/actions/submitTribe'

class TribeForm extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    // from redux:
    initialValues: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitTribe)(event)
  }

  render() {
    const {fields: {tribe_name, tribe_type, city, currency}, error, submitting} = this.props

    return (
      <ScrollView style={styles.container}>
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
        <View style={styles.actions}>
          <Button id={'submit.tribe.' + (this.props.item ? 'update' : 'create')} onPress={this.handleSubmit} disabled={submitting} />
        </View>
        {error && <FormattedMessage id={error} style={{color: 'red'}} />}
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  actions: {
    alignItems: 'center',
  },
})

const mapStateToProps = (state, ownProps) => {
  const initialValues = {
    currency: state.member.tribe.currency,
  }
  if (ownProps.item) {
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
