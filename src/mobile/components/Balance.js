import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text} from 'react-native'

import ListItem from '../components/ListItem'
import FormattedNumber from './FormattedNumber'

import colors from '../../common/constants/colors'

class Balance extends Component {
  static propTypes = {
    // from parent:
    user: PropTypes.object.isRequired,
  }

  render() {
    const {user} = this.props

    const rightLabel = (
      <FormattedNumber
        value={user.balance}
        format="money"
        sign={true}
        style={user.balance < 0 ? styles.negative : styles.positive}
      />
    )

    return (
      <ListItem user={user} rightLabel={rightLabel} style={styles.container}>
        <Text style={styles.title}>{user.name}</Text>
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: colors.primaryText,
  },
  positive: {
    fontSize: 16,
    color: colors.positive,
  },
  negative: {
    fontSize: 16,
    color: colors.error,
  },
})

export default Balance
