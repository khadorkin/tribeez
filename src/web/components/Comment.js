import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedRelative} from 'react-intl'

import Avatar from 'material-ui/Avatar'

import gravatar from '../../common/utils/gravatar'

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    userMap: PropTypes.object.isRequired,
  }

  render() {
    const {comment} = this.props

    const author = this.props.userMap[comment.author_id]

    return (
      <div style={styles.container}>
        <Avatar src={gravatar(author)} size={30} style={styles.avatar} />
        <div style={styles.body}>
          <div>
            <span style={styles.author}>{author.name} </span>
            <span style={styles.content}>{comment.content}</span>
          </div>
          <div style={styles.time}>
            <FormattedRelative value={comment.added} />
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    padding: '10px 0',
  },
  avatar: {
    marginRight: '16px',
  },
  body: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  author: {
    color: '#aaaaaa',
  },
  time: {
    color: '#aaaaaa',
  },
}

const mapStateToProps = (state) => ({
  userMap: state.member.tribe.userMap,
})

export default connect(mapStateToProps)(Comment)
