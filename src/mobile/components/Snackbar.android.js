import {Component, PropTypes} from 'react'
import {ToastAndroid} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {injectIntl, intlShape} from 'react-intl'

import {closeSnack} from '../../common/actions/app'

class Snackbar extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
    uid: PropTypes.string,
    tid: PropTypes.string,
    snack: PropTypes.object.isRequired,
    // action creators:
    closeSnack: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(props) {
    const {snack} = props

    if (!snack.open) {
      return
    }

    let snack_author_name
    if (snack.author) {
      const snack_author = props.userMap[snack.author]
      snack_author_name = (snack.author === props.uid ? '_you_' : snack_author.name)
    }

    const id = 'snack.' + snack.message
    const values = {author: snack_author_name, name: snack.name}

    ToastAndroid.show(this.props.intl.formatMessage({id}, values), ToastAndroid.SHORT)

    this.props.closeSnack()
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
  uid: state.user.uid,
  tid: state.tribe.id,
  snack: state.app.snack,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  closeSnack,
}, dispatch)

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(Snackbar)
