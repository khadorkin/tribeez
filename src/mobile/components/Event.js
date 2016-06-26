import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'

import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Event extends Component {
  static propTypes = {
    // from redux:
    userMap: PropTypes.object.isRequired,
    // from parent:
    item: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const route = routes.EVENT
    route.item = this.props.item
    router.push(route)
  }

  render() {
    const {item, userMap} = this.props

    const host = userMap[item.host_id]
    if (!host) {
      return null
    }

    const start = new Date(item.start)
    const suffix = (start.getHours() !== 0 || start.getMinutes() !== 0) ? 'time' : ''

    let date
    if (item.end) {
      date = <FormattedMessage id={'interval' + suffix} values={{start: item.start, end: item.end}} />
    } else {
      date = <FormattedMessage id={'date' + suffix} values={{date: item.start}} />
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handlePress} style={styles.main}>
          <Image
            source={{uri: gravatar(host)}}
            style={styles.avatar}
          />
          <View style={styles.titles}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  userMap: state.member.tribe.userMap,
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    elevation: 1,
  },
  main: {
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
  subtitle: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Event)
