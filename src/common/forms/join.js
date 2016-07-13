import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    email: state.join.invite ? state.join.invite.email : '',
    token: ownProps.token,
  },
  invite: state.join.invite,
})

export default (component) => {
  return reduxForm({
    form: 'join',
    fields: ['name', 'email', 'password', 'lang', 'token'],
    validate: validator(['name', 'email', 'password', 'lang']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps)(component)
}
