import React, {Component, PropTypes} from 'react'
import {ScrollView, Text, Linking, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Details from '../hoc/Details'
import FormattedMessage from '../components/FormattedMessage'
import FormattedDate from '../components/FormattedDate'
import Touchable from '../components/Touchable'
import Log from '../components/Log'

import colors from '../../common/constants/colors'

const infos = [
  {id: 'author', icon: 'person'},
  {id: 'description', icon: 'description'},
  {id: 'start', icon: 'flight-land'},
  {id: 'end', icon: 'flight-takeoff'},
  {id: 'location', icon: 'place'},
  {id: 'url', icon: 'link'},
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

  renderItem() {
    const {event} = this.props

    //TODO: UI

    return (
      <ScrollView>
        {
          infos
            .filter((info) => event[info.id])
            .map((info) => {
              let value = event[info.id]
              let href = null
              if (info.id === 'url') {
                href = value
                value = value.replace(/^(https?:\/\/|)(www\.|)/, '')
              }
              if (info.id === 'location') {
                href = 'https://www.google.com/maps?q=' + encodeURIComponent(value)
              }
              if (info.id === 'author') {
                value = this.props.userMap[value].name
              }

              if (info.id === 'start' || info.id === 'end') {
                const date = new Date(value)
                if (date.getHours() !== 0 || date.getMinutes() !== 0) {
                  value = <FormattedMessage id="datetime" values={{date}} />
                } else {
                  value = <FormattedDate value={value} options={{day: 'numeric', month: 'long', year: 'numeric'}} />
                }
              } else {
                value = <Text style={styles.value}>{value}</Text>
              }

              return (
                <Touchable onPress={href && this.handlePress.bind(this, href)} style={styles.info} key={info.id}>
                  <Icon name={info.icon} color={colors.icon} size={24} style={styles.icon} />
                  {value}
                </Touchable>
              )
            })
        }
        <Log type="event" item={event} />
      </ScrollView>
    )
  }

  render() {
    return (
      <Details type="event" id={this.props.id}>
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
  value: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
})

const mapStateToProps = (state) => ({
  // for <Details> HoC:
  event: state.item.event,
  // for this component:
  userMap: state.tribe.userMap,
})

export default connect(mapStateToProps)(EventDetails)
