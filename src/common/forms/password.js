import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  initialValues: {
    lang: state.app.lang,
  },
})

export default (component) => {
  return reduxForm({
    form: 'password',
    fields: ['email', 'lang'],
    validate: validator(['email', 'lang']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps)(component)
}
