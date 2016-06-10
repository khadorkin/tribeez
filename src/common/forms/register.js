import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = () => ({
  initialValues: {
    city: {},
  },
})

const validate = ['name', 'email', 'password', 'lang', 'tribe_name', 'tribe_type', 'city', 'currency']
if (platform === 'web') {
  validate.push('captcha')
}

export default (component) => {
  return reduxForm({
    form: 'register',
    fields: ['name', 'email', 'password', 'lang', 'tribe_name', 'tribe_type', 'city', 'currency', 'captcha'],
    validate: validator(validate),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps)(component)
}
