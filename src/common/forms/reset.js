import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    token: ownProps.token,
  },
  username: state.reset.name,
})

export default (component) => {
  return reduxForm({
    form: 'reset',
    fields: ['password', 'password2', 'token'],
    validate: validator(['password', 'password2']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps)(component)
}
