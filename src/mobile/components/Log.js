import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import CommentBox from './CommentBox'
import Avatar from '../components/Avatar'
import FormattedRelative from '../components/FormattedRelative'
import FormattedMessage from '../components/FormattedMessage'

import colors from '../../common/constants/colors'
import {getTimestamp} from '../../common/utils/time'
import updateComment from '../../common/actions/updateComment'
import postComment from '../../common/actions/postComment'

class Log extends Component {
  static propTypes = {
    // from parent:
    type: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
    comment: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    // action creators:
    updateComment: PropTypes.func.isRequired,
    postComment: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleComment = this.handleComment.bind(this)
  }

  handleChange(text) {
    this.props.updateComment(text)
  }

  handleComment() {
    const comment = this.props.comment.trim()
    if (comment) {
      this.props.postComment(this.props.type, this.props.item, comment)
    }
  }

  renderEntry(entry, id) {
    const {type, userMap, user} = this.props

    const author = userMap[entry.author]
    if (!author) {
      return null
    }

    let title
    let content
    let backgroundColor

    if (entry.action === 'comment') {
      title = <Text style={styles.text}>{author.name}</Text>
      content = <Text style={[styles.text, {color: colors[type + 's']}]}>{entry.text}</Text>
    } else {
      const values = {}
      if (author.uid === user.uid) {
        values.author = '_you_'
      } else {
        values.author = author.name
      }

      switch (type) {
        case 'bill':
          values.name = entry.item.name
          values.amount = entry.item.amount
          const amount = entry.item.parts[user.uid]
          if (amount) {
            content = <FormattedMessage id={`entry.bill.${entry.action}.infos`} values={{amount}} style={styles.text} />
          } else {
            content = <FormattedMessage id={`entry.bill.${entry.action}.stranger`} style={styles.text} />
          }
          break
        case 'poll':
          values.name = entry.item.name
          break
        case 'event':
          values.name = entry.item.name
          values.when = getTimestamp(entry.item.start)
          break
        case 'task':
          values.name = entry.item.name
          break
        default:
          return null
      }

      title = <FormattedMessage id={`entry.${type}.${entry.action}`} values={values} style={styles.text} />

      backgroundColor = colors[type + 's_light']
    }

    return (
      <View key={id} style={[styles.entry, {backgroundColor}]}>
        <Avatar user={author} />
        <View style={styles.content}>
          {title}
          {content}
        </View>
        <FormattedRelative style={styles.time} value={entry.time} />
      </View>
    )
  }

  render() {
    const {item, comment, user} = this.props

    const entries = item.log //TODO: get from item

    if (!entries || !user) {
      return null // loading
    }

    // reverse manually since keys might not conserve order:
    const keys = Object.keys(entries).sort((a, b) => (a > b ? -1 : 1))

    return (
      <View>
        <View style={styles.header}>
          <FormattedMessage id="log" style={styles.title} />
          <CommentBox
            user={user}
            value={comment}
            onChangeText={this.handleChange}
            onSubmitEditing={this.handleComment}
          />
        </View>
        {
          keys.map((id) => this.renderEntry(entries[id], id))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    borderTopWidth: 1,
    borderTopColor: colors.underline,
    marginHorizontal: 16,
    marginTop: 8,
  },
  title: {
    color: colors.primaryText,
    fontSize: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  entry: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 16,
  },
  text: {
    color: colors.primaryText,
  },
  time: {
    fontStyle: 'italic',
    color: colors.secondaryText,
    marginLeft: 16,
  },
})

const mapStateToProps = (state) => ({
  comment: state.item.comment,
  userMap: state.tribe.userMap,
  user: state.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateComment,
  postComment,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Log)
