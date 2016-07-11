import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  initialValues: {
    lang: state.app.lang,
    tribe: state.tribe.key,
  },
})

export default (component) => {
  return reduxForm({
    form: 'invite',
    fields: ['email', 'lang', 'tribe'],
    validate: validator(['email', 'lang']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps)(component)
}
