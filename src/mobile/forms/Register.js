import React, {Component, PropTypes} from 'react'
import {StyleSheet} from 'react-native'

import Form from '../hoc/Form'
import FormattedMessage from '../components/FormattedMessage'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'

import colors from '../../common/constants/colors'

import form from '../../common/forms/register'
import submitRegister from '../../common/actions/submitRegister'
import langs from '../../common/resources/langs'
import currencies from '../../common/resources/currencies'
import {TRIBE_TYPES} from '../../common/constants/product'
const types = TRIBE_TYPES.map((type) => ({name: type, code: type})) //TODO: translate

class RegisterForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    initialValues: PropTypes.object,
  }

  render() {
    const {fields: {name, email, password, lang, tribe_name, tribe_type, city, currency}, ...props} = this.props

    return (
      <Form name="register" action={submitRegister} {...props}>
        <FormattedMessage id="you" style={styles.subtitle} />
        <SelectField ref="lang"
          {...lang}
          items={langs}
        />
        <TextField ref="name"
          {...name}
          autoCorrect={false}
          name="username"
        />
        <TextField ref="email"
          {...email}
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextField ref="password"
          {...password}
          secureTextEntry={true}
        />
        <FormattedMessage id="your_tribe" style={styles.subtitle} />
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

const styles = StyleSheet.create({
  subtitle: {
    color: colors.primaryText,
    marginHorizontal: 5,
    marginBottom: 10,
    fontSize: 20,
    //textAlign: 'center',
  },
})

export default form(RegisterForm)
