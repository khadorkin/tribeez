import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Card, CardHeader} from 'material-ui/Card'

import gravatar from '../../common/utils/gravatar'

class Invite extends Component {
  static propTypes = {
    invite: PropTypes.object.isRequired,
    userMap: PropTypes.object.isRequired,
  }

  render() {
    const {invite} = this.props

    const inviter = this.props.userMap[invite.inviter]
    if (!inviter) {
      return null
    }

    const when = <FormattedRelative value={invite.invited} />
    const subtitle = <FormattedMessage id="invited_by" values={{user: inviter.name, when}} />

    //TODO: link to detailed view
    return (
      <Card style={styles.container}>
        <CardHeader title={invite.email}
          subtitle={subtitle}
          avatar={gravatar(inviter)}
        />
      </Card>
    )
  }
}

const styles = {
  container: {
    margin: '15px 10px 0',
  },
}

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
})

export default connect(mapStateToProps)(Invite)
