import React, {Component, PropTypes} from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'

import {reduxForm} from 'redux-form'

import TextField from '../components/TextField'
import SelectField from '../components/SelectField'
import FormattedMessage from '../components/FormattedMessage'
import Button from '../components/Button'

import langs from '../../common/resources/langs'

import validator from '../../common/utils/formValidator'

import submitInvite from '../../common/actions/submitInvite'

class NewMember extends Component {
  static propTypes = {
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
    this.props.handleSubmit(submitInvite)(event)
  }

  render() {
    const {fields: {email, lang}, error, submitting} = this.props

    return (
      <ScrollView style={styles.container}>
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
        <View style={styles.actions}>
          <Button id="submit.invite" onPress={this.handleSubmit} disabled={submitting} />
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
    lang: state.member.user.lang,
  },
})

export default reduxForm({
  form: 'invite',
  fields: ['email', 'lang'],
  validate: validator.invite,
  touchOnBlur: false,
}, mapStateToProps)(NewMember)
