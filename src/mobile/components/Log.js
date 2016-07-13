import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import CommentBox from './CommentBox'

import updateComment from '../../common/actions/updateComment'
import postComment from '../../common/actions/postComment'

class Log extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.object.isRequired,
    // from redux:
    log: PropTypes.object.isRequired,
    userMap: PropTypes.object.isRequired,
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
    const comment = this.props.log.comment.trim()
    if (comment) {
      this.props.postComment(this.props.item, comment)
    }
  }

  render() {
    const {log: {comment}, userMap} = this.props

    const entries = {} //TODO: get from item

    //TODO: UI

    return (
      <View style={styles.container}>
        {
          Object.keys(entries).map((id) => {
            const entry = entries[id]
            const author = userMap[entry.author]
            if (entry.action === 'comment') {
              return <Text key={id}>Comment by {author.name}: {entry.text}</Text>
            } else {
              return <Text key={id}>Entry by {author.name}: {entry.action}</Text>
            }
          })
        }
        <CommentBox
          value={comment}
          onChangeText={this.handleChange}
          onSubmitEditing={this.handleComment}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginBottom: 80,
  },
  empty: {
    marginVertical: 24,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
})

const mapStateToProps = (state) => ({
  log: state.log,
  userMap: state.tribe.userMap,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateComment,
  postComment,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Log)
