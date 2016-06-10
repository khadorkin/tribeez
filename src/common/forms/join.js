import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    email: state.join.data.email,
    token: ownProps.token,
  },
  inviter: state.join.data.inviter,
  title: state.join.data.tribe_name, // automatically sent to <Form> thanks to the spread operator ;)
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
