import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import autoLogin from '../../common/actions/autoLogin'

class AutoLogin extends Component {
  static propTypes = {
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.subscribe()
  }

  componentWillUnmount() {
    this.props.unsubscribe()
  }

  render() {
    return null
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  subscribe: autoLogin.on,
  unsubscribe: autoLogin.off,
}, dispatch)

export default connect(null, mapDispatchToProps)(AutoLogin)
