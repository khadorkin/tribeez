import React, {Component, PropTypes} from 'react'
import {StyleSheet} from 'react-native'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import DateField from './fields/Date'
import FormattedMessage from '../components/FormattedMessage'

import form from '../../common/forms/profile'
import submitProfile from '../../common/actions/submitProfile'
import langs from '../../common/resources/langs'

const today = Date.now()

class ProfileForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    initialValues: PropTypes.object,
    tribe_ids: PropTypes.array,
  }

  render() {
    const {fields: {name, email, lang, birthdate, phone, password, password2}, ...props} = this.props

    return (
      <ScrollView>
        <Form name="profile" action={submitProfile.bind(null, '', this.props.tribe_ids)} {...props}>
          <FormattedMessage
            id="gravatar"
            values={{link: 'gravatar.com'}}
            style={styles.gravatar}
          />
          <TextField ref="name"
            {...name}
            autoCorrect={false}
            name="username"
            onSubmitEditing={this.handleSubmit}
          />
          <TextField ref="email"
            {...email}
            autoCorrect={false}
            keyboardType="email-address"
            onSubmitEditing={this.handleSubmit}
            errorId={email.error && 'email_' + email.error}
          />
          <SelectField ref="lang"
            {...lang}
            items={langs}
          />
          <DateField ref="birthdate"
            max={today}
            {...birthdate}
          />
          <TextField ref="phone"
            {...phone}
            keyboardType="phone-pad"
            onSubmitEditing={this.handleSubmit}
          />
          <TextField ref="password"
            {...password}
            name="new_password"
            secureTextEntry={true}
            onSubmitEditing={this.handleSubmit}
            errorId={password.error && 'password_' + password.error}
          />
          <TextField ref="password2"
            {...password2}
            secureTextEntry={true}
            onSubmitEditing={this.handleSubmit}
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
