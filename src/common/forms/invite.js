import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  initialValues: {
    lang: state.user.lang,
    tribe: state.tribe.key,
    tribe_name: state.tribe.name,
    inviter_name: state.user.name,
  },
})

export default (component) => {
  return reduxForm({
    form: 'invite',
    fields: ['email', 'lang', 'tribe', 'tribe_name', 'inviter_name'],
    validate: validator(['email', 'lang']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps)(component)
}
