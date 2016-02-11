import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, FormattedRelative } from 'react-intl'

import Avatar from 'material-ui/lib/avatar'

import styles from './Comment.css'

class Comment extends Component {

  render() {
    let user = this.props.users.find(user => user.id === this.props.comment.user_id)
    return (
      <div className={styles.container}>
        <Avatar src={'https://secure.gravatar.com/avatar/' + user.gravatar + '?d=retro&s=30'} size={30} />
        <div className={styles.body}>
          <div>
            <span className={styles.author}>{user.name} </span>
            <span className={styles.content}>{this.props.comment.content}</span>
          </div>
          <div className={styles.time}>
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
  users: state.user.tribe.users,
})

export default connect(mapStateToProps)(Comment)
