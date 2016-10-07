import {connect} from 'react-redux'
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
  return connect(mapStateToProps)(reduxForm({
    form: 'profile',
    validate: validator(['name', 'email', 'lang'], ['birthdate', 'phone', 'password', 'password2']),
    touchOnBlur: (platform === 'web'),
  })(component))
}
