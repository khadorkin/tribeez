import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

import FormattedMessage from './FormattedMessage'

import gravatar from '../../common/utils/gravatar'

class Member extends Component {
  static propTypes = {
    // from parent:
    user: PropTypes.object.isRequired,
  }

  render() {
    const {user} = this.props

    return (
      <View style={styles.container}>
        <Image
          source={{uri: gravatar(user, 80)}}
          style={styles.avatar}
        />
        <View style={styles.titles}>
          <Text style={styles.title}>{user.name}</Text>
          <FormattedMessage id="member_since" values={{when: user.registered}} style={styles.subtitle} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 10,
    elevation: 1,
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
    color: 'rgba(0, 0, 0, 0.8)',
  },
  subtitle: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
})

export default Member
