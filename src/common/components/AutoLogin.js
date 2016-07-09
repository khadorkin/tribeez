import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {auth} from '../firebase'
import {login} from '../actions/app'

class AutoLogin extends Component {
  static propTypes = {
    // action creators:
    login: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.off = auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.login(user)
      }
    })
  }

  componentWillUnmount() {
    this.off()
  }

  render() {
    return null
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
}, dispatch)

export default connect(null, mapDispatchToProps)(AutoLogin)
