import React, {Component, PropTypes} from 'react'
import {KeyboardAvoidingView, View, StyleSheet} from 'react-native'

import Form from '../hoc/Form'
import {Field} from 'redux-form'
import TextField from './fields/Text'
import FormattedMessage from '../components/FormattedMessage'

import form from '../../common/forms/password'
import submitPassword from '../../common/actions/submitPassword'
import colors from '../../common/constants/colors'
import {elevation} from '../dimensions'

class PasswordForm extends Component {
  static propTypes = {
    // from redux-form:
    handleSubmit: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitPassword)(event) //TODO: prevent duplicate code
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Form name="password" action={submitPassword} style={styles.form} {...this.props}>
          <View style={styles.box}>
            <FormattedMessage id="password_reset" style={styles.subtitle} />
            <Field
              name="email"
              component={TextField}
              autoFocus={true}
              autoCorrect={false}
              keyboardType="email-address"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
        </Form>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    justifyContent: 'center',
  },
  box: {
    marginTop: 56,
    backgroundColor: colors.background,
    ...elevation(1),
    margin: 16,
    padding: 16,
  },
  subtitle: {
    marginBottom: 50,
    textAlign: 'center',
  },
})

export default form(PasswordForm)
