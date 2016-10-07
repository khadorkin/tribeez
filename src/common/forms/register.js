import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  lang: state.app.lang, //TODO: this should also update fields
  initialValues: {
    lang: state.app.lang,
    city: {},
  },
})

const validate_fields = ['name', 'email', 'password', 'lang', 'tribe_name', 'tribe_type', 'city', 'currency']
if (platform === 'web') {
  validate_fields.push('captcha')
}

export default (component) => {
  return connect(mapStateToProps)(reduxForm({
    form: 'register',
    validate: validator(validate_fields),
    touchOnBlur: (platform === 'web'),
  })(component))
}
