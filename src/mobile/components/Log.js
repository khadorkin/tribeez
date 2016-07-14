import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import CommentBox from './CommentBox'

import updateComment from '../../common/actions/updateComment'
import postComment from '../../common/actions/postComment'
import colors from '../../common/constants/colors'

class Log extends Component {
  static propTypes = {
    // from parent:
    type: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
    comment: PropTypes.string.isRequired,
    commenting: PropTypes.bool.isRequired,
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

  render() {
    const {item, userMap, comment, commenting} = this.props

    const entries = item.log //TODO: get from item

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
        <ActivityIndicator size="small" color={colors.main} animating={commenting} />
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
  comment: state.item.comment,
  commenting: state.item.commenting,
  userMap: state.tribe.userMap,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateComment,
  postComment,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Log)
