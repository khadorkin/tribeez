import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
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
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    initialValues: PropTypes.object,
  }

  render() {
    const {fields: {name, email, password, lang, tribe_name, tribe_type, city, currency}, ...props} = this.props

    return (
      <ScrollView>
        <Form name="register" action={submitRegister} {...props}>
          <InfoBox type="info" id="register_info" />
          <View style={styles.section}>
            <View style={styles.sectionIcon}>
              <Icon name="person" size={24} color={colors.members} />
            </View>
            <FormattedMessage id="you" style={styles.sectionText} />
          </View>
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
            errorId={email.error && 'email_' + email.error}
          />
          <TextField ref="password"
            {...password}
            secureTextEntry={true}
            errorId={password.error && 'password_' + password.error}
          />

          <View style={styles.section}>
            <View style={styles.sectionIcon}>
              <Icon name="people" size={24} color={colors.members} />
            </View>
            <FormattedMessage id="your_tribe" style={styles.sectionText} />
          </View>
          <TextField ref="tribe_name"
            {...tribe_name}
            autoCorrect={false}
          />
          <SelectField ref="tribe_type"
            {...tribe_type}
            items={types}
          />
          <CityField ref="city"
            {...city}
            //onFocus={this.handleFocus} //TODO: make visible the list of proposals
          />
          <SelectField ref="currency"
            {...currency}
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
