import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => ({
  lang: state.app.lang, //force field label update when hot switching lang
  initialValues: {
    email: state.join.invite ? state.join.invite.email : '',
    token: ownProps.token,
  },
  invite: state.join.invite,
  err: state.join.error,
})

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'join',
    validate: validator(['name', 'email', 'password', 'lang']),
    touchOnBlur: (platform === 'web'),
    enableReinitialize: true, // because the email address is filled in asynchronously
  })(component))
}
