import React, {Component, PropTypes} from 'react'
import {ScrollView, Text, TouchableOpacity, Linking, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Details from '../hoc/Details'
import FormattedMessage from '../components/FormattedMessage'
import FormattedDate from '../components/FormattedDate'
import Log from '../components/Log'

import getItem from '../../common/actions/getEvent'
import routes from '../../common/routes'
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
    id: PropTypes.number.isRequired,
    // from redux:
    item: PropTypes.object,
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
    const host = this.props.userMap[event.host_id]

    event.host = host.name

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
        <Log type="event" id={event.id} />
      </ScrollView>
    )
  }

  render() {
    return (
      <Details
        {...this.props}
        render={this.renderItem}
        editRoute={routes.EVENTS_EDIT}
      />
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

const mapStateToProps = (state, ownProps) => ({
  // for <Details> HoC:
  item: state.upcomingevents.items.find((i) => i.id === ownProps.id)
      || state.pastevents.items.find((i) => i.id === ownProps.id)
      || state.events.current,
  loading: state.events.loading,
  error: state.events.error,
  // for this component:
  userMap: state.member.tribe.userMap,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getItem,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)
