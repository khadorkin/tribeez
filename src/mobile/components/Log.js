import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Spinner from './Spinner'
import CommentBox from './CommentBox'

import getLog from '../../common/actions/getLog'
import updateComment from '../../common/actions/updateComment'
import postComment from '../../common/actions/postComment'

class Log extends Component {
  static propTypes = {
    // from parent:
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    // from redux:
    log: PropTypes.object.isRequired,
    userMap: PropTypes.object.isRequired,
    // action creators:
    getLog: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    postComment: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleComment = this.handleComment.bind(this)
  }

  componentDidMount() {
    this.props.getLog(this.props.type, this.props.id) //TODO: merge with get[Item]
  }

  handleChange(text) {
    this.props.updateComment(text)
  }

  handleComment() {
    const comment = this.props.log.comment.trim()
    if (comment) {
      this.props.postComment(this.props.type, this.props.id, comment)
    }
  }

  render() {
    const {log: {loading, error, items, comment}, userMap} = this.props

    if (error) {
      return (
        <View style={styles.empty}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )
    }

    if (loading) {
      return (
        <View style={styles.empty}>
          <Spinner visible={true} />
        </View>
      )
    }

    //TODO: UI

    return (
      <View style={styles.container}>
        {
          items.map((item) => {
            const author = userMap[item.user_id]
            if (item.action === 'comment') {
              return <Text key={item.action + item.id}>Comment by {author.name}: {item.data.text}</Text>
            } else {
              return <Text key={item.action + item.id}>Entry by {author.name}: {item.action}</Text>
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
  getLog,
  updateComment,
  postComment,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Log)
