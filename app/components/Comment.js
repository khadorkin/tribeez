import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, FormattedRelative } from 'react-intl'

import Avatar from 'material-ui/lib/avatar'

import css from './Comment.css'

class Comment extends Component {

  render() {
    let user = this.props.users.find(user => user.id === this.props.comment.user_id)
    return (
      <div className={css.container}>
        <Avatar src={'https://secure.gravatar.com/avatar/' + user.gravatar + '?d=retro&s=30'} size={30} />
        <div className={css.body}>
          <div>
            <span className={css.author}>{user.name} </span>
            <span className={css.content}>{this.props.comment.content}</span>
          </div>
          <div className={css.time}>
            <FormattedRelative value={this.props.comment.added} />
          </div>
        </div>
      </div>
    )
  }

}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  users: PropTypes.array,
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
})

export default connect(mapStateToProps)(Comment)
