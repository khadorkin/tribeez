import React, {Component, PropTypes} from 'react'

import {Card, CardHeader} from 'material-ui/Card'

import Money from './Money'

import gravatar from '../../common/utils/gravatar'

class Balance extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const {user} = this.props

    const amount = (
      <Money value={user.balance} style={styles.amount} />
    )

    return (
      <Card style={styles.container}>
        <CardHeader title={user.name}
          subtitle={amount}
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
  amount: {
    fontWeight: 'normal',
  },
}

export default Balance
