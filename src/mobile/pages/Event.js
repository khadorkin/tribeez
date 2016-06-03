import React, {Component, PropTypes} from 'react'
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import FormattedMessage from '../components/FormattedMessage'
import FormattedDate from '../components/FormattedDate'

import colors from '../../common/constants/colors'

const infos = [
  {id: 'host', icon: 'person'},
  {id: 'description', icon: 'description'},
  {id: 'start', icon: 'flight-land', date: true},
  {id: 'end', icon: 'flight-takeoff', date: true},
  {id: 'location', icon: 'place', map: true},
  {id: 'url', icon: 'link', link: true},
]

class Event extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.object.isRequired,
    // from redux:
    users: PropTypes.array.isRequired,
  }

  handlePress(url) {
    if (url) {
      Linking.openURL(url)
    }
  }

  render() {
    const {item, users} = this.props

    const host = users.find((u) => u.id === item.host_id)
    if (!host) {
      return null
    }
    item.host = host.name

    return (
      <View style={styles.container}>
        {
          infos
            .filter((info) => item[info.id])
            .map((info) => {
              let value = item[info.id]
              if (info.date) {
                const date = new Date(value)
                if (date.getHours() !== 0 || date.getMinutes() !== 0) {
                  value = <FormattedMessage id="datetime" values={{date}} />
                } else {
                  value = <FormattedDate value={date} day="numeric" month="long" />
                }
              }
              let href = null
              if (info.link) {
                href = value
                value = value.replace(/^(https?:\/\/|)(www\.|)/, '')
              }
              if (info.map) {
                href = 'https://www.google.com/maps?q=' + encodeURIComponent(value)
              }
              if (typeof value === 'string') {
                value = <Text>{value}</Text>
              }
              return (
                <TouchableOpacity onPress={this.handlePress.bind(this, href)} style={styles.info} key={info.id}>
                  <Icon name={info.icon} color={colors.icon} size={24} style={styles.icon} />
                  {value}
                </TouchableOpacity>
              )
            })
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    backgroundColor: 'white',
    flex: 1,
  },
  info: {
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
})

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
})

export default connect(mapStateToProps)(Event)
