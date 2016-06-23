import React, {Component, PropTypes} from 'react'
import {StyleSheet, TouchableOpacity, View, Image, Text} from 'react-native'

import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'
import FormattedRelative from './FormattedRelative'

import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Entry extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.object,
    // from redux:
    users: PropTypes.array.isRequired,
    currency: PropTypes.string,
    uid: PropTypes.number,
  }

  handleTouch() {
    //TODO: navigate to item details
  }

  render() {
    const {item, users, uid} = this.props

    const author = users.find((u) => u.id === item.user_id)
    if (!author) {
      return null
    }

    const values = {}
    if (author.id === uid) {
      values.author = '_you_'
    } else {
      values.author = author.name
    }

    switch (item.item_type) {
      case 'user':
        if (item.item_id) {
          //TODO: show inviter somewhere
          // const inviter = users.find((u) => u.id === item.item_id)
          // if (inviter) {
          //   infos = <FormattedMessage id={`entry.user.${item.action}.infos`} values={{inviter: inviter.name}} />
          // }
        }
        break
      case 'bill':
        values.name = item.data.name
        values.amount = item.data.amount
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

    const title = <FormattedMessage id={`entry.${item.item_type}.${item.action}`} values={values} />
    const date = <FormattedRelative value={item.added} />

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleTouch} style={styles.main}>
          <Image
            source={{uri: gravatar(author)}}
            style={styles.avatar}
          />
          <View style={styles.titles}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
  uid: state.member.user.id,
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
  extra: {
    padding: 10,
  },
  infos: {
    marginBottom: 10,
  },
  form: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
  submit: {
    flex: 1,
  },
})

export default connect(mapStateToProps)(Entry)
