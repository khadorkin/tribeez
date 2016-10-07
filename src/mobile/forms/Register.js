import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import {Field} from 'redux-form'
import InfoBox from '../components/InfoBox'
import FormattedMessage from '../components/FormattedMessage'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'

import colors from '../../common/constants/colors'

import form from '../../common/forms/register'
import submitRegister from '../../common/actions/submitRegister'
import langs from '../../common/constants/langs'
import currencies from '../../common/constants/currencies'

import {TRIBE_TYPES} from '../../common/constants/product'

const types = TRIBE_TYPES.map((type) => ({code: type}))

class RegisterForm extends Component {
  render() {
    return (
      <ScrollView ref="sv">
        <Form name="register" action={submitRegister} {...this.props}>
          <InfoBox type="info" id="register_info" />
          <View style={styles.section}>
            <View style={styles.sectionIcon}>
              <Icon name="person" size={24} color={colors.members} />
            </View>
            <FormattedMessage id="you" style={styles.sectionText} />
          </View>
          <Field
            name="lang"
            component={SelectField}
            items={langs}
          />
          <Field
            name="name"
            labelId="username"
            component={TextField}
            autoCorrect={false}
          />
          <Field
            name="email"
            component={TextField}
            autoCorrect={false}
            keyboardType="email-address"
            errorIsCustom={true}
          />
          <Field
            name="password"
            component={TextField}
            secureTextEntry={true}
            errorIsCustom={true}
          />

          <View style={styles.section}>
            <View style={styles.sectionIcon}>
              <Icon name="people" size={24} color={colors.members} />
            </View>
            <FormattedMessage id="your_tribe" style={styles.sectionText} />
          </View>
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
          <Field ref="city"
            name="city"
            component={CityField}
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

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  sectionIcon: {
    marginLeft: 8,
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: colors.underline,
  },
  sectionText: {
    color: colors.primaryText,
    marginLeft: 20,
    fontSize: 18,
  },
})

export default form(RegisterForm)
