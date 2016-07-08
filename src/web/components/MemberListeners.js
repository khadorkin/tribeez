import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import subscribe from '../../common/actions/subscribe'

class MemberListeners extends Component {
  static propTypes = {
    // from redux:
    tid: PropTypes.string,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(props) {
    if (props.tid && !this.subscribed) {
      this.props.subscribe(props.tid)
      this.subscribed = true
    }
  }
  componentWillUnmount() {
    this.props.unsubscribe()
    this.subscribed = false
  }
  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  tid: state.tribe.key,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  subscribe: subscribe.on,
  unsubscribe: subscribe.off,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MemberListeners)
