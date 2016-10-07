import React, {Component, PropTypes} from 'react'
import {StyleSheet} from 'react-native'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import {Field} from 'redux-form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import DateField from './fields/Date'
import FormattedMessage from '../components/FormattedMessage'

import form from '../../common/forms/profile'
import submitProfile from '../../common/actions/submitProfile'
import langs from '../../common/constants/langs'

const today = Date.now()

class ProfileForm extends Component {
  static propTypes = {
    // from redux:
    initialValues: PropTypes.object,
    tribe_ids: PropTypes.array,
  }

  render() {
    const {tribe_ids, ...props} = this.props

    return (
      <ScrollView>
        <Form name="profile" action={submitProfile.bind(null, '', tribe_ids)} {...props}>
          <FormattedMessage
            id="gravatar"
            values={{link: 'gravatar.com'}}
            style={styles.gravatar}
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
            name="lang"
            component={SelectField}
            items={langs}
          />
          <Field
            name="birthdate"
            component={DateField}
            max={today}
          />
          <Field
            name="phone"
            component={TextField}
            keyboardType="phone-pad"
          />
          <Field
            name="password"
            labelId="new_password"
            component={TextField}
            secureTextEntry={true}
            errorIsCustom={true}
          />
          <Field
            name="password2"
            component={TextField}
            secureTextEntry={true}
          />
        </Form>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  gravatar: {
    margin: 8,
    marginBottom: 24,
  },
})

export default form(ProfileForm)
