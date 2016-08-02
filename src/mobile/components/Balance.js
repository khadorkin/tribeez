import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

import FormattedNumber from './FormattedNumber'

import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Balance extends Component {
  static propTypes = {
    // from parent:
    user: PropTypes.object.isRequired,
  }

  render() {
    const {user} = this.props

    return (
      <View style={styles.container}>
        <Image
          source={{uri: gravatar(user)}}
          style={styles.avatar}
        />
        <View style={styles.titles}>
          <Text style={styles.title}>{user.name}</Text>
          <FormattedNumber
            value={user.balance}
            format="money"
            sign={true}
            style={user.balance < 0 ? styles.negative : styles.positive}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginVertical: 5,
    elevation: 1,
    padding: 10,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  titles: {
    flex: 1,
  },
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
