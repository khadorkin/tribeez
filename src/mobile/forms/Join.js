import React, {Component, PropTypes} from 'react'
import {Text, StyleSheet} from 'react-native'

import Form from '../hoc/Form'
import FormattedMessage from '../components/FormattedMessage'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import colors from '../../common/constants/colors'

import form from '../../common/forms/join'
import submitJoin from '../../common/actions/submitJoin'
import langs from '../../common/resources/langs'

class JoinForm extends Component {
  static propTypes = {
    // from parent component:
    token: PropTypes.string.isRequired,
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    initialValues: PropTypes.object,
    inviter: PropTypes.string,
    title: PropTypes.string, // tribe_name
  }

  render() {
    const {fields: {name, email, password, lang}, ...props} = this.props

    return (
      <Form name="join" action={submitJoin} {...props}>
        <Text style={styles.title}>{this.props.title}</Text>
        <FormattedMessage id="invited_you" values={{name: this.props.inviter}} style={styles.subtitle} />
        <TextField ref="name"
          {...name}
          autoCorrect={false}
          name="username"
        />
        <TextField ref="email"
          {...email}
          errorIsObject={true}
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextField ref="password"
          {...password}
          secureTextEntry={true}
        />
        <SelectField ref="lang"
          {...lang}
          items={langs}
        />
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.primaryText,
    fontSize: 20,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default form(JoinForm)
