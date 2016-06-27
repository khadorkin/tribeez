import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedRelative} from 'react-intl'

import Avatar from 'material-ui/Avatar'

import gravatar from '../../common/utils/gravatar'

import css from './Comment.css'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    userMap: PropTypes.object.isRequired,
  }

  render() {
    const {comment} = this.props

    const author = this.props.userMap[comment.author_id]

    return (
      <div className={css.container}>
        <Avatar src={gravatar(author)} size={30} className={css.avatar} />
        <div className={css.body}>
          <div>
            <span className={css.author}>{author.name} </span>
            <span className={css.content}>{comment.content}</span>
          </div>
          <div className={css.time}>
            <FormattedRelative value={comment.added} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userMap: state.member.tribe.userMap,
})

export default connect(mapStateToProps)(Comment)
