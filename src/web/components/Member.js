import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import {Card, CardHeader} from 'material-ui/Card'

import gravatar from '../../common/utils/gravatar'

class Member extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const {user} = this.props

    const date = <FormattedMessage id="member_since" values={{when: user.registered}} />

    //TODO: link to detailed view
    return (
      <Card style={styles.container}>
        <CardHeader title={user.name}
          subtitle={date}
          avatar={gravatar(user)}
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

export default Member
