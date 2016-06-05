import React, {Component, PropTypes} from 'react'
import {View, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Fab from '../components/Fab'
import FormattedMessage from '../components/FormattedMessage'
import FormattedDate from '../components/FormattedDate'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'

const infos = [
  {id: 'host', icon: 'person'},
  {id: 'description', icon: 'description'},
  {id: 'start', icon: 'flight-land', date: true},
  {id: 'end', icon: 'flight-takeoff', date: true},
  {id: 'location', icon: 'place', map: true},
  {id: 'url', icon: 'link', link: true},
]

class EventDetails extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.object.isRequired,
    // from redux:
    users: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handlePress(url) {
    if (url) {
      Linking.openURL(url)
    }
  }

  handleFab() {
    const route = routes.EVENTS_EDIT
    route.edit = this.props.item
    router.push(routes.EVENTS_EDIT)
  }

  render() {
    const {item, users} = this.props

    const host = users.find((u) => u.id === item.host_id)

    item.host = host.name

    //TODO: UI

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
                  value = <FormattedDate value={value} day="numeric" month="long" />
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
        <Fab name="edit" onPress={this.handleFab} />
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

export default connect(mapStateToProps)(EventDetails)
