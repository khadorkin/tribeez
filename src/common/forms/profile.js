import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  initialValues: {
    name: state.user.name,
    email: state.user.email,
    lang: state.user.lang,
    phone: state.user.phone,
    birthdate: state.user.birthdate,
  },
  reauth_prompt: state.app.messages.reauth_prompt,
  tribe_ids: Object.keys(state.user.tribes),
})

export default (component) => {
  return reduxForm({
    form: 'profile',
    fields: ['name', 'email', 'lang', 'phone', 'birthdate', 'password', 'password2'],
    validate: validator(['name', 'email', 'lang'], ['birthdate', 'phone', 'password', 'password2']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps)(component)
}
