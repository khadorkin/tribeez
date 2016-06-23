import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Card, CardHeader, CardText} from 'material-ui/Card'

import postComment from '../../common/actions/postComment'
import updateComment from '../../common/actions/updateComment'

import gravatar from '../../common/utils/gravatar'

import css from './Entry.css'

class Entry extends Component {
  constructor(props) {
    super(props)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleSubmitComment = this.handleSubmitComment.bind(this)
  }

  handleCommentChange(event) {
    this.props.updateComment(this.props.entry.id, event.target.value)
  }

  handleSubmitComment(event) {
    event.preventDefault()
    const id = this.props.entry.id
    this.props.postComment(id, this.props.boxComments[id])
  }

  render() {
    const {entry, users, uid} = this.props

    // to render an activity, the users must be loaded for the current tribe activity (see parent component)
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

    switch (entry.item_type) {
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
    const title = <FormattedMessage id={`entry.${entry.item_type}.${entry.action}`} values={values} />

    const date = <FormattedRelative value={entry.added} />

    if (infos) {
      infos = (
        <CardText>
          {infos}
        </CardText>
      )
    }

    return (
      <Card className={css.container}>
        <CardHeader title={title} subtitle={<span>{date}</span>}
          style={{height: 'auto', whiteSpace: 'nowrap'}}
          textStyle={{whiteSpace: 'normal', paddingRight: '90px'}}
          avatar={gravatar(author)}
        />
        {infos}
      </Card>
    )
  }

}

Entry.propTypes = {
  entry: PropTypes.object.isRequired,
  boxComments: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  uid: PropTypes.number,
  postComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  boxComments: state.activity.boxComments,
  users: state.member.tribe.users,
  uid: state.member.user.id,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postComment,
  updateComment,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Entry)
