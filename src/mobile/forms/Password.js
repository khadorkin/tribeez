import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import FormattedMessage from '../components/FormattedMessage'

import form from '../../common/forms/password'
import submitPassword from '../../common/actions/submitPassword'

class PasswordForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitPassword)(event) //TODO: prevent duplicate code
  }

  render() {
    const {fields: {email}, ...props} = this.props

    const subtitle = <FormattedMessage id="password_reset" style={styles.subtitle} />

    return (
      <Form name="password" action={submitPassword} {...props}>
        <View style={styles.container}>
          <View style={styles.box}>
            {subtitle}
            <TextField ref="email"
              {...email}
              autoFocus={true}
              autoCorrect={false}
              keyboardType="email-address"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
        </View>
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 32, // bump up by 16dp
  },
  box: {
    backgroundColor: 'white',
    elevation: 1,
    margin: 16,
    padding: 24,
  },
  subtitle: {
    marginBottom: 50,
    textAlign: 'center',
  },
  lostPassword: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  lostText: {
    //
  },
})

export default form(PasswordForm)
