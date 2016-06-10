import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  destination: state.login.destination,
  invite: state.join.data,
  initialValues: {
    email: state.join.data.email, // email is null when not coming from /join
    invite_token: state.join.data.token,
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
