import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    email: state.join.data.email,
    tribe: ownProps.tribe,
    token: ownProps.token,
  },
  invite: state.join.data,
})

export default (component) => {
  return reduxForm({
    form: 'join',
    fields: ['name', 'email', 'password', 'lang', 'tribe', 'token'],
    validate: validator(['name', 'email', 'password', 'lang']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps)(component)
}
