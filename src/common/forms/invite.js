import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state) => ({
  initialValues: {
    lang: state.app.lang,
    tribe: state.tribe.id,
  },
})

export default (component) => {
  return connect(mapStateToProps)(reduxForm({
    form: 'invite',
    validate: validator(['email', 'lang']),
    touchOnBlur: (platform === 'web'),
  })(component))
}
