import React, {Component, PropTypes} from 'react'
import {StyleSheet} from 'react-native'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import FormattedMessage from '../components/FormattedMessage'

import form from '../../common/forms/reset'
import submitReset from '../../common/actions/submitReset'

class ResetForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
    username: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNext() {
    this.refs.password2.focus()
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitReset)(event) //TODO: prevent duplicate code
  }

  render() {
    const {fields: {password, password2}, username, ...props} = this.props

    const subtitle = username ? (
      <FormattedMessage id="password_change" values={{name: username}} style={styles.subtitle} />
    ) : null

    return (
      <Form name="reset" action={submitReset} {...props}>
        {subtitle}
        <TextField ref="password"
          {...password}
          secureTextEntry={true}
          onSubmitEditing={this.handleNext}
        />
        <TextField ref="password2"
          {...password2}
          secureTextEntry={true}
          onSubmitEditing={this.handleSubmit}
        />
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: 50,
    textAlign: 'center',
  },
})

export default form(ResetForm)
