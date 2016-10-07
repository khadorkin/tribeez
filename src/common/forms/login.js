import {connect} from 'react-redux'
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
  return connect(mapStateToProps)(reduxForm({
    form: 'login',
    validate: validator(['email', 'password'], ['invite_token']),
    touchOnBlur: (platform === 'web'),
  })(component))
}
