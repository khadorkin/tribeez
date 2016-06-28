import React, {Component, PropTypes} from 'react'
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native'

import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'
import FormattedRelative from './FormattedRelative'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Entry extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.object,
    // from redux:
    userMap: PropTypes.object.isRequired,
    currency: PropTypes.string,
    uid: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.handleTouch = this.handleTouch.bind(this)
  }

  handleTouch() {
    const {item} = this.props

    if (item.action === 'delete') {
      return // no details page since it got deleted
    }

    const route = routes[item.item_type.toUpperCase()]
    if (route.name === 'member') {
      route.item = {
        id: item.user_id,
        name: this.props.userMap[item.user_id].name,
      }
    } else {
      route.item = {
        id: item.item_id,
        name: item.data.name,
      }
    }

    router.push(route)
  }

  render() {
    const {item, userMap, uid} = this.props

    const author = userMap[item.user_id]
    if (!author) {
      return null
    }

    const values = {}
    if (author.id === uid) {
      values.author = '_you_'
    } else {
      values.author = author.name
    }

    let infos

    switch (item.item_type) {
      case 'member':
        if (item.item_id) {
          const inviter = userMap[item.item_id]
          if (inviter) {
            infos = <FormattedMessage id={`entry.member.${item.action}.infos`} values={{inviter: inviter.name}} style={styles.infos} />
          }
        }
        break
      case 'bill':
        values.name = item.data.name
        values.amount = item.data.amount
        const user_part = item.data.parts.find((part) => part.user_id === uid)
        if (user_part) {
          infos = <FormattedMessage id={`entry.bill.${item.action}.infos`} values={{amount: user_part.amount}} style={styles.infos} />
        } else {
          infos = <FormattedMessage id={`entry.bill.${item.action}.stranger`} style={styles.infos} />
        }
        break
      case 'poll':
        values.name = item.data.name
        break
      case 'event':
        values.name = item.data.name
        values.when = item.data.start
        break
      case 'task':
        values.name = item.data.name
        break
      default:
        return null
    }

    if (item.action === 'comment') {
      infos = <Text style={styles.infos}>{item.data.text}</Text>
    }

    const title = <FormattedMessage id={`entry.${item.item_type}.${item.action}`} values={values} />
    const date = <FormattedRelative value={item.added} />

    return (
      <View style={[styles.container, {backgroundColor: item.new ? '#FFFFDD' : 'white'}]}>
        <TouchableOpacity onPress={this.handleTouch} style={styles.main}>
          <Image
            source={{uri: gravatar(author)}}
            style={styles.avatar}
          />
          <View style={styles.titles}>
            <Text style={styles.title}>{title}</Text>
            {infos}
            <Text style={styles.date}>{date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  userMap: state.member.tribe.userMap,
  currency: state.member.tribe.currency,
  uid: state.member.user.id,
})

const styles = StyleSheet.create({
  container: {
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
  infos: {
    color: colors.primaryText,
    fontStyle: 'italic',
  },
  date: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Entry)
