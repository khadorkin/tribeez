import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    email: state.join.invite ? state.join.invite.email : '',
    token: ownProps.token,
  },
  invite: state.join.invite,
  err: state.join.error,
})

export default (component) => {
  return connect(mapStateToProps)(reduxForm({
    form: 'join',
    validate: validator(['name', 'email', 'password', 'lang']),
    touchOnBlur: (platform === 'web'),
    enableReinitialize: true, // because the email address is filled in asynchronously
  })(component))
}
