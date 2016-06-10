import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  initialValues: {
    name: state.member.user.name,
    email: state.member.user.email,
    lang: state.member.user.lang,
    phone: state.member.user.phone,
    birthdate: state.member.user.birthdate,
  },
  lang: state.app.lang,
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
