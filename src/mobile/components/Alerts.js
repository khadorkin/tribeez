import {Component, PropTypes} from 'react'
import {Alert} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {injectIntl, intlShape} from 'react-intl'

import {closeAlert} from '../../common/actions/app'

class Alerts extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    // from redux:
    alert: PropTypes.object.isRequired,
    // action creators:
    closeAlert: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(props) {
    const {alert, intl} = props

    if (!alert.open) {
      return
    }

    if (alert.title_id) {
      alert.title = intl.formatMessage({id: alert.title_id})
    }
    if (alert.text_id) {
      alert.text = intl.formatMessage({id: alert.text_id})
    }

    const buttons = alert.buttons.map((button) => {
      if (button.text_id) {
        button.text = intl.formatMessage({id: button.text_id})
        delete button.text_id
      }
      return button
    })

    Alert.alert(alert.title, alert.text, buttons)

    this.props.closeAlert()
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  alert: state.app.alert,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  closeAlert,
}, dispatch)

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(Alerts)
