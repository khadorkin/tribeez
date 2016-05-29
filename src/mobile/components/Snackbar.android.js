import {Component, PropTypes} from 'react'
import {ToastAndroid} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {injectIntl, intlShape} from 'react-intl'

import {closeSnack} from '../../common/actions/app'

class Snackbar extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    users: PropTypes.array.isRequired,
    uid: PropTypes.number,
    snack: PropTypes.object.isRequired,
    closeSnack: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(props) {
    const {snack} = props

    if (!snack.open) {
      return
    }

    const snack_author = props.users.find((u) => u.id === snack.author)
    const snack_author_name = snack_author && (snack_author.id === props.uid ? '_you_' : snack_author.name)

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
  users: state.member.tribe.users,
  uid: state.member.user.id,
  snack: state.app.snack,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  closeSnack,
}, dispatch)

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps)
)(Snackbar)
