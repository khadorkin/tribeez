import React, {Component, PropTypes} from 'react'
import {View, Image, StyleSheet, Dimensions} from 'react-native'

import FormattedMessage from './FormattedMessage'

import colors from '../../common/constants/colors'

const sources = {
  bills: require('../../common/images/empty/bills.png'),
  events: require('../../common/images/empty/events.png'),
  tasks: require('../../common/images/empty/tasks.png'),
  notes: require('../../common/images/empty/notes.png'),
  polls: require('../../common/images/empty/polls.png'),
  invites: require('../../common/images/empty/invites.png'),
}

const IMAGE_SIZE = Dimensions.get('window').width / 1.75

class Empty extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  render() {
    const {name} = this.props

    return (
      <View style={styles.container}>
        <Image source={sources[name]} style={styles.image} />
        <FormattedMessage id={'empty.' + name} style={[styles.text, {color: colors[name + '_light']}]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // take all space
    justifyContent: 'center', // vertically center
    alignItems: 'center', // horizontally center
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    opacity: 0.75,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 64,
  },
})

export default Empty
