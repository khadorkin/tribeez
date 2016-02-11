import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage, FormattedRelative } from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import Avatar from 'material-ui/lib/avatar'
import TextField from 'material-ui/lib/text-field'
import IconButton from 'material-ui/lib/icon-button'
import SendIcon from 'material-ui/lib/svg-icons/content/send'

import Comment from './Comment'

import postComment from '../actions/postComment'
import updateComment from '../actions/updateComment'

import styles from './Activity.css'

class Activity extends Component {

  handleCommentChange(id, event) {
    this.props.updateComment(id, event.target.value)
  }

  postComment(id, event) {
    event.preventDefault()
    this.props.postComment(id, this.props.boxComments[id])
  }

  render() {
    let user = this.props.users.find(user => user.id === this.props.entry.user_id)
    let title = <FormattedMessage id={'entry.' + this.props.entry.type} values={{name: user.name}} />
    let date = <FormattedRelative value={this.props.entry.added} />
    let comments = (
      <span style={{fontWeight: this.props.entry.comments.length ? 'bold' : 'normal'}}>
        <FormattedMessage id="entry.comments" values={{num: this.props.entry.comments.length}} />
      </span>
    )

    return (
      <Card className={styles.container}>
        <CardHeader title={title} subtitle={<span>{date} — {comments}</span>}
                    avatar={'https://secure.gravatar.com/avatar/' + user.gravatar + '?d=retro&s=40'}
                    actAsExpander={true} showExpandableButton={true} />
        <CardText expandable={true} className={styles.comments}>
          {
            this.props.entry.comments.map(comment => <Comment comment={comment} key={comment.id} />)
          }
          <form onSubmit={this.postComment.bind(this, this.props.entry.id)}>
            <TextField value={this.props.boxComments[this.props.entry.id]}
                       onChange={this.handleCommentChange.bind(this, this.props.entry.id)}
                       hintText={<FormattedMessage id="comment" />}
                       autoComplete="off" />
            <IconButton type="submit"><SendIcon /></IconButton>
          </form>
        </CardText>
      </Card>
    )
  }

}

Activity.propTypes = {
  entry: PropTypes.object.isRequired,
  boxComments: PropTypes.object.isRequired,
  users: PropTypes.array,
}

const mapStateToProps = (state) => ({
  boxComments: state.activity.boxComments,
  users: state.user.tribe.users,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postComment,
  updateComment,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
