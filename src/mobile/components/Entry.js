import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'

import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'
import FormattedRelative from './FormattedRelative'
import Touchable from './Touchable'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Entry extends Component {
  static propTypes = {
    // from parent:
    entry: PropTypes.object,
    // from redux:
    userMap: PropTypes.object.isRequired,
    currency: PropTypes.string,
    uid: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.handleTouch = this.handleTouch.bind(this)
  }

  handleTouch() {
    const {entry} = this.props

    if (entry.action === 'delete') {
      return // no details page since it got deleted
    }

    const route = routes[entry.type.toUpperCase()]
    if (route.name === 'member') {
      route.item = {
        id: entry.author,
        name: this.props.userMap[entry.author].name,
      }
    } else {
      route.item = entry.item
    }

    router.push(route)
  }

  render() {
    const {entry, userMap, uid} = this.props

    const author = userMap[entry.author]
    if (!author) {
      return null
    }

    const values = {}
    if (author.uid === uid) {
      values.author = '_you_'
    } else {
      values.author = author.name
    }

    let infos

    switch (entry.type) {
      case 'member':
        if (entry.inviter) {
          const inviter = userMap[entry.inviter]
          if (inviter) {
            infos = <FormattedMessage id={`entry.member.${entry.action}.infos`} values={{inviter: inviter.name}} style={styles.infos} />
          }
        }
        break
      case 'bill':
        values.name = entry.item.name
        values.amount = entry.item.amount
        const amount = entry.item.parts[uid]
        if (amount) {
          infos = <FormattedMessage id={`entry.bill.${entry.action}.infos`} values={{amount}} style={styles.infos} />
        } else {
          infos = <FormattedMessage id={`entry.bill.${entry.action}.stranger`} style={styles.infos} />
        }
        break
      case 'poll':
        values.name = entry.item.name
        break
      case 'event':
        values.name = entry.item.name
        values.when = entry.item.start
        break
      case 'task':
        values.name = entry.item.name
        break
      default:
        return null
    }

    if (entry.action === 'comment') {
      infos = <Text style={styles.infos}>{entry.item.text}</Text>
    }

    const title = <FormattedMessage id={`entry.${entry.type}.${entry.action}`} values={values} />
    const date = <FormattedRelative value={entry.time} />

    return (
      <View style={entry.new ? styles.new : styles.read}>
        <Touchable onPress={this.handleTouch} style={styles.main}>
          <Image
            source={{uri: gravatar(author)}}
            style={styles.avatar}
          />
          <View style={styles.text}>
            <Text style={styles.title}>{title}</Text>
            {infos}
            <Text style={styles.date}>{date}</Text>
          </View>
        </Touchable>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
  currency: state.tribe.currency,
  uid: state.user.uid,
})

const styles = StyleSheet.create({
  new: {
    backgroundColor: colors.new,
  },
  read: {
    backgroundColor: colors.background,
  },
  main: {
    paddingLeft: 12,
    paddingTop: 12,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  text: {
    flex: 1,
    paddingBottom: 12,
    paddingRight: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
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
