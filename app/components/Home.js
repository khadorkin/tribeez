import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routeActions } from 'react-router-redux'
import { FormattedMessage, FormattedRelative } from 'react-intl'
import { Link } from 'react-router'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardHeader from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'

import SendIcon from 'material-ui/lib/svg-icons/content/send'

import getActivity from '../actions/getActivity'
import postComment from '../actions/postComment'
import updateComment from '../actions/updateComment'

class Home extends Component {

  componentWillMount() {
    this.props.getActivity(0, 10)
  }

  handleCommentChange(id, event) {
    this.props.updateComment(id, event.target.value)
  }

  postComment(id, event) {
    event.preventDefault()
    this.props.postComment(id, this.props.boxComments[id])
  }

  render() {
    return (
      <div>
        {
          this.props.entries.map((entry) => {
            let title = <FormattedMessage id={'entry.' + entry.type} values={{name: entry.user_name}} />
            let date = <FormattedRelative value={entry.added * 1000} />
            let comments = <FormattedMessage id="entry.comments" values={{num: entry.comments.length}} />
            return (
              <Card key={'entry_' + entry.id}>
                <CardHeader title={title} subtitle={<span>{date} — {comments}</span>} actAsExpander={true} showExpandableButton={true} />
                {
                  entry.comments.map(comment => <CardText key={'comment_' + comment.id} expandable={true}>{comment.content}</CardText>)
                }
                <CardText expandable={true}>
                  <form onSubmit={this.postComment.bind(this, entry.id)}>
                    <TextField value={this.props.boxComments[entry.id]} onChange={this.handleCommentChange.bind(this, entry.id)} hintText={<FormattedMessage id="comment" defaultMessage="Your comment..." />} />
                    <IconButton type="submit"><SendIcon /></IconButton>
                  </form>
                </CardText>
              </Card>
            )
          })
        }
      </div>
    )
  }

}

Home.propTypes = {
  name: PropTypes.string,
  balance: PropTypes.number,
  entries: PropTypes.array,
}

const mapStateToProps = (state) => ({
  name: state.user.data.name,
  balance: state.user.data.balance,
  entries: state.activity.entries,
  boxComments: state.activity.boxComments,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getActivity,
  postComment,
  updateComment,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
