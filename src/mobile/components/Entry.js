import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

import {connect} from 'react-redux'

import Message from './Message'
import FormattedNumber from './FormattedNumber'
import FormattedDate from './FormattedDate'
import FormattedRelative from './FormattedRelative'

import gravatar from '../../common/utils/gravatar'

class Entry extends Component {
  static propTypes = {
    // from redux:
    users: PropTypes.array.isRequired,
    currency: PropTypes.string,
    uid: PropTypes.number,
    // from parent:
    entry: PropTypes.object,
  }

  render() {
    const {entry, users, currency, uid} = this.props

    const author = users.find((u) => u.id === entry.user_id)
    if (!author) {
      return null
    }

    const values = {}
    if (author.id === uid) {
      values.author = '_you_'
    } else {
      values.author = author.name
    }

    switch (entry.type) {
      case 'user':
        //
        break
      case 'bill':
        values.name = entry.data.name
        values.amount = <FormattedNumber value={entry.data.amount} style="currency" currency={currency} />
        break
      case 'poll':
        values.name = entry.data.name
        break
      case 'event':
        values.name = entry.data.name
        values.when = <FormattedDate value={entry.data.start} />
        break
      case 'task':
        values.name = entry.data.name
        break
      default:
        return null
    }
    const title = <Message id={`entry.${entry.type}.${entry.action}`} values={values} />

    const date = <FormattedRelative value={entry.added} />
    const comments = <Message id="entry.comments" values={{num: entry.comments.length}} />

    return (
      <View style={styles.entry}>
        <Image
          source={{uri: gravatar(author)}}
          style={styles.avatar}
        />
        <View style={styles.titles}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{date} — {comments}</Text>
        </View>
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
  entry: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 5,
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
    color: 'rgba(0, 0, 0, 0.8)',
  },
  subtitle: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
})

export default connect(mapStateToProps)(Entry)
