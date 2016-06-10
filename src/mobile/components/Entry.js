import React, {Component, PropTypes} from 'react'
import {StyleSheet, TouchableOpacity, View, Image, Text, TextInput} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import FormattedMessage from './FormattedMessage'
import FormattedRelative from './FormattedRelative'
import Comment from './Comment'

import postComment from '../../common/actions/postComment'
import updateComment from '../../common/actions/updateComment'

import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Entry extends Component {
  static propTypes = {
    // from parent:
    entry: PropTypes.object,
    // from redux:
    boxComments: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    currency: PropTypes.string,
    uid: PropTypes.number,
    // action creators:
    postComment: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
    })
  }

  handleCommentChange(text) {
    this.props.updateComment(this.props.entry.id, text)
  }

  handleSubmitComment() {
    const id = this.props.entry.id
    this.props.postComment(id, this.props.boxComments[id])
  }

  render() {
    const {entry, users, uid} = this.props

    const author = users.find((u) => u.id === entry.user_id)
    if (!author) {
      return null
    }

    let infos

    const values = {}
    if (author.id === uid) {
      values.author = '_you_'
    } else {
      values.author = author.name
    }

    switch (entry.type) {
      case 'user':
        if (entry.item_id) {
          const inviter = users.find((u) => u.id === entry.item_id)
          if (inviter) {
            infos = <FormattedMessage id={`entry.user.${entry.action}.infos`} values={{inviter: inviter.name}} />
          }
        }
        break
      case 'bill':
        values.name = entry.data.name
        values.amount = entry.data.amount
        const user_part = entry.data.parts.find((part) => part.user_id === uid)
        if (user_part) {
          infos = <FormattedMessage id={`entry.bill.${entry.action}.infos`} values={{amount: user_part.amount}} />
        } else {
          infos = <FormattedMessage id={`entry.bill.${entry.action}.stranger`} />
        }
        break
      case 'poll':
        values.name = entry.data.name
        break
      case 'event':
        values.name = entry.data.name
        values.when = entry.data.start
        break
      case 'task':
        values.name = entry.data.name
        break
      default:
        return null
    }
    const title = <FormattedMessage id={`entry.${entry.type}.${entry.action}`} values={values} />

    const date = <FormattedRelative value={entry.added} />
    const comments = <FormattedMessage id="entry.comments" values={{num: entry.comments.length}} />

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleToggle} style={styles.main}>
          <Image
            source={{uri: gravatar(author)}}
            style={styles.avatar}
          />
          <View style={styles.titles}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{date} — {comments}</Text>
          </View>
        </TouchableOpacity>
        {
          this.state.open && (
            <View style={styles.extra}>
              {
                infos && <View style={styles.infos}>{infos}</View>
              }
              {
                entry.comments.map((comment) =>
                  <Comment comment={comment} key={comment.id} />
                )
              }
              <View style={styles.form}>
                <TextInput
                  value={this.props.boxComments[entry.id]}
                  onChangeText={this.handleCommentChange}
                  style={styles.input}
                  onSubmitEditing={this.handleSubmitComment}
                  placeholder="Your comment..."
                />
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  boxComments: state.activity.boxComments,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
  uid: state.member.user.id,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postComment,
  updateComment,
}, dispatch)

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

export default connect(mapStateToProps, mapDispatchToProps)(Entry)
