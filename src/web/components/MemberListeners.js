import {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {injectIntl, intlShape} from 'react-intl'

import subscribe from '../../common/actions/subscribe'
import gravatar from '../../common/utils/gravatar'

class MemberListeners extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    // from redux:
    uid: PropTypes.string,
    tid: PropTypes.string,
    snack: PropTypes.object.isRequired,
    userMap: PropTypes.object,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(props) {
    if (props.tid && !this.subscribed) {
      this.props.subscribe(props.tid)
      this.subscribed = true

      if (window.Notification && Notification.permission !== 'granted') {
        Notification.requestPermission()
      }
    }

    const snack = props.snack
    if (snack.open && snack.key !== this.props.snack.key && snack.author !== this.props.uid && window.Notification && Notification.permission === 'granted') {
      const author = this.props.userMap[snack.author]
      const title = this.props.intl.formatMessage({id: 'snack.' + snack.message}, {author: author.name, name: snack.name})
      const notification = new Notification(title, {icon: gravatar(author, 160)})
      setTimeout(notification.close.bind(notification), 5000)
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
  uid: state.user.uid,
  tid: state.tribe.key,
  snack: state.app.snack,
  userMap: state.tribe.userMap,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  subscribe: subscribe.on,
  unsubscribe: subscribe.off,
}, dispatch)

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(MemberListeners)
