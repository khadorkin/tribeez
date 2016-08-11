import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  destination: state.login.destination,
  invite: state.join.invite,
  initialValues: {
    email: state.join.invite ? state.join.invite.email : state.login.email,
    invite_token: state.join.invite ? state.join.invite.token : '',
  },
})

export default (component) => {
  return reduxForm({
    form: 'login',
    fields: ['email', 'password', 'invite_token'],
    validate: validator(['email', 'password'], ['invite_token']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps)(component)
}
