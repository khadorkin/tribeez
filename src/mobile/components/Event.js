import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'

import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Event extends Component {
  static propTypes = {
    // from redux:
    users: PropTypes.array.isRequired,
    // from parent:
    event: PropTypes.object.isRequired,
  }

  render() {
    const {event, users} = this.props

    const host = users.find((u) => u.id === event.host_id)
    if (!host) {
      return null
    }

    const start = new Date(event.start)
    const suffix = (start.getHours() !== 0 || start.getMinutes() !== 0) ? 'time' : ''

    let date
    if (event.end) {
      date = <FormattedMessage id={'interval' + suffix} values={{start: event.start, end: event.end}} />
    } else {
      date = <FormattedMessage id={'date' + suffix} values={{date: event.start}} />
    }

    return (
      <View style={styles.container}>
        <Image
          source={{uri: gravatar(host, 80)}}
          style={styles.avatar}
        />
        <View style={styles.titles}>
          <Text style={styles.title}>{event.name}</Text>
          <Text style={styles.subtitle}>{date}</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
})

const styles = StyleSheet.create({
  container: {
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
    color: colors.primaryText,
  },
  subtitle: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Event)
