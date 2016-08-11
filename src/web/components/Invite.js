import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Card, CardHeader} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'

import gravatar from '../../common/utils/gravatar'

class Invite extends Component {
  static propTypes = {
    // from parent:
    invite: PropTypes.object.isRequired,
    onResent: PropTypes.func.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleResend = this.handleResend.bind(this)
  }

  handleResend() {
    this.props.onResent(this.props.invite)
  }

  render() {
    const {invite} = this.props

    const inviter = this.props.userMap[invite.inviter]
    if (!inviter) {
      return null
    }

    const ago = <FormattedRelative value={invite.invited} />
    const subtitle = <FormattedMessage id="invited_by" values={{user: inviter.name, ago}} />

    //TODO: link to detailed view
    return (
      <Card style={styles.container}>
        <CardHeader title={invite.email}
          subtitle={subtitle}
          avatar={gravatar(inviter)}
        >
          <IconButton onTouchTap={this.handleResend} style={styles.resend}>
            <RefreshIcon />
          </IconButton>
        </CardHeader>
      </Card>
    )
  }
}

const styles = {
  container: {
    margin: '15px 10px 0',
  },
  resend: {
    position: 'absolute',
    top: 13,
    right: 8,
  },
}

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
})

export default connect(mapStateToProps)(Invite)
