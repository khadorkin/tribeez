import React, {Component, PropTypes} from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'

import {reduxForm} from 'redux-form'

import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import DatePicker from '../components/DatePicker'
import FormattedMessage from '../components/FormattedMessage'
import Button from '../components/Button'

import langs from '../../common/resources/langs'

import validator from '../../common/utils/formValidator'

import submitProfile from '../../common/actions/submitProfile'

const today = new Date()

class ProfileForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    // from redux:
    initialValues: PropTypes.object,
    lang: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitProfile)(event)
  }

  render() {
    const {fields: {name, email, lang, birthdate, phone, password, password2}, error, submitting} = this.props

    return (
      <ScrollView style={styles.container}>
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
        />
        <SelectField ref="lang"
          {...lang}
          items={langs}
        />
        <DatePicker ref="birthdate"
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
        />
        <TextField ref="password2"
          {...password2}
          secureTextEntry={true}
          onSubmitEditing={this.handleSubmit}
        />
        <View style={styles.actions}>
          <Button id="submit.profile" onPress={this.handleSubmit} disabled={submitting} />
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

const mapStateToProps = (state) => ({
  initialValues: {
    name: state.member.user.name,
    email: state.member.user.email,
    lang: state.member.user.lang,
    phone: state.member.user.phone,
    birthdate: state.member.user.birthdate,
  },
  lang: state.app.lang,
})

export default reduxForm({
  form: 'profile',
  fields: ['name', 'email', 'lang', 'phone', 'birthdate', 'password', 'password2'],
  validate: validator.profile,
  touchOnBlur: false,
}, mapStateToProps)(ProfileForm)
