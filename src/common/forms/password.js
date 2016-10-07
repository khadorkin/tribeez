import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  initialValues: {
    email: state.login.email,
    lang: state.app.lang,
  },
})

export default (component) => {
  return connect(mapStateToProps)(reduxForm({
    form: 'password',
    validate: validator(['email', 'lang']),
    touchOnBlur: (platform === 'web'),
  })(component))
}
