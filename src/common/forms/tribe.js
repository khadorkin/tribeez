import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => {
  const initialValues = {
    currency: state.tribe.currency,
    city: {},
  }
  if (ownProps.type === 'update') {
    initialValues.tribe_name = state.tribe.name
    initialValues.tribe_type = state.tribe.type
    initialValues.city = state.tribe.city
    initialValues.id = state.tribe.id
  }
  return {
    initialValues,
  }
}

export default (component) => {
  return connect(mapStateToProps)(reduxForm({
    form: 'tribe',
    validate: validator(['tribe_name', 'tribe_type', 'city', 'currency']),
    touchOnBlur: (platform === 'web'),
    enableReinitialize: true, //TODO
  })(component))
}
