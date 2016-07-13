import React, {Component, PropTypes} from 'react'
import {ScrollView, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Details from '../hoc/Details'
import FormattedMessage from '../components/FormattedMessage'
import FormattedDate from '../components/FormattedDate'
import Log from '../components/Log'

import routes from '../../common/routes'
import colors from '../../common/constants/colors'

const infos = [
  {id: 'author', icon: 'person'},
  {id: 'description', icon: 'description'},
  {id: 'start', icon: 'flight-land', date: true},
  {id: 'end', icon: 'flight-takeoff', date: true},
  {id: 'location', icon: 'place', map: true},
  {id: 'url', icon: 'link', link: true},
]

class EventDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
    // from redux:
    event: PropTypes.object,
    userMap: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  handlePress(url) {
    Linking.openURL(url)
  }

  renderItem(event) {
    const author = this.props.userMap[event.author]

    event.author = author.name

    //TODO: UI

    return (
      <ScrollView>
        {
          infos
            .filter((info) => event[info.id])
            .map((info) => {
              let value = event[info.id]
              if (info.date) {
                const date = new Date(value)
                if (date.getHours() !== 0 || date.getMinutes() !== 0) {
                  value = <FormattedMessage id="datetime" values={{date}} />
                } else {
                  value = <FormattedDate value={value} options={{day: 'numeric', month: 'long', year: 'numeric'}} />
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
                <TouchableOpacity onPress={href && this.handlePress.bind(this, href)} style={styles.info} key={info.id}>
                  <Icon name={info.icon} color={colors.icon} size={24} style={styles.icon} />
                  {value}
                </TouchableOpacity>
              )
            })
        }
        <Log item={event} />
      </ScrollView>
    )
  }

  render() {
    return (
      <Details type="event"
        id={this.props.id}
        item={this.props.event}
        editRoute={routes.EVENTS_EDIT}
      >
        {this.props.event && this.renderItem()}
      </Details>
    )
  }
}

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
})

const mapStateToProps = (state) => ({
  // for <Details> HoC:
  event: state.item.event,
  loading: state.events.loading,
  error: state.events.error,
  // for this component:
  userMap: state.tribe.userMap,
})

export default connect(mapStateToProps)(EventDetails)
