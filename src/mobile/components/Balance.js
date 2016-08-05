import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text} from 'react-native'

import ListItem from '../hoc/ListItem'
import FormattedNumber from './FormattedNumber'

import colors from '../../common/constants/colors'

class Balance extends Component {
  static propTypes = {
    // from parent:
    user: PropTypes.object.isRequired,
  }

  render() {
    const {user} = this.props

    return (
      <ListItem user={user}>
        <Text style={styles.title}>{user.name}</Text>
        <FormattedNumber
          value={user.balance}
          format="money"
          sign={true}
          style={user.balance < 0 ? styles.negative : styles.positive}
        />
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.primaryText,
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.error,
  },
})

export default Balance
