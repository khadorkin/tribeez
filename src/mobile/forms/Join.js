import React, {Component, PropTypes} from 'react'
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import {Field} from 'redux-form'
import FormattedMessage from '../components/FormattedMessage'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import colors from '../../common/constants/colors'

import form from '../../common/forms/join'
import getInvite from '../../common/actions/getInvite'
import submitJoin from '../../common/actions/submitJoin'
import langs from '../../common/constants/langs'

class JoinForm extends Component {
  static propTypes = {
    // from parent component:
    tribe: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    invite: PropTypes.object,
    lang: PropTypes.string.isRequired,
    // action creators:
    getInvite: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getInvite(this.props.tribe, this.props.token)
  }

  render() {
    const {invite, lang, ...props} = this.props

    if (!invite || invite.converted) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.main} />
        </View>
      )
    }

    return (
      <ScrollView>
        <Form name="join" action={submitJoin.bind(null, this.props.invite)} {...props}>
          <Text style={styles.title}>{invite.tribe_name}</Text>
          <FormattedMessage id="invited_you" values={{name: invite.inviter_name}} style={styles.subtitle} />
          <Field
            name="lang"
            component={SelectField}
            items={langs}
            lang={lang}
          />
          <Field
            name="name"
            labelId="username"
            component={TextField}
            autoCorrect={false}
            lang={lang}
          />
          <Field
            name="email"
            component={TextField}
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
            errorIsCustom={true}
            lang={lang}
          />
          <Field
            name="password"
            component={TextField}
            secureTextEntry={true}
            errorIsCustom={true}
            lang={lang}
          />
        </Form>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 200,
  },
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

export default form(JoinForm, {
  getInvite,
})
