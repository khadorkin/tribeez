import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedRelative} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Checkbox from 'material-ui/lib/checkbox'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'
import IconButton from 'material-ui/lib/icon-button'
import EditButton from 'material-ui/lib/svg-icons/image/edit'
import DeleteButton from 'material-ui/lib/svg-icons/action/delete'
import Toggle from 'material-ui/lib/toggle'
import * as colors from 'material-ui/lib/styles/colors'

import gravatar from '../utils/gravatar'

import routes from '../constants/routes'

import postVote from '../actions/postVote'
import putPoll from '../actions/putPoll'

import css from './Entry.css'

class Poll extends Component {

  constructor(props) {
    super(props)
    this.state = {
      choices: [],
      again: false,
    }
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleCheck(id, event, checked) {
    if (checked) {
      this.setState({
        choices: [...this.state.choices, id],
      })
    } else {
      this.setState({
        choices: this.state.choices.filter((i) => i !== id),
      })
    }
  }

  handleChange(event, id) {
    this.setState({
      choices: [Number(id)],
    })
  }

  handleReset() {
    this.setState({
      again: true,
    })
  }

  handleSubmit() {
    const choices = this.state.choices
    if (choices.length) {
      this.props.postVote(this.props.poll.id, choices, this.props.uid)
      this.setState({
        again: false,
      })
    }
  }

  handleToggle(event, active) {
    this.props.putPoll({
      id: this.props.poll.id,
      active,
    })
  }

  handleDelete() {
    this.props.onDelete(this.props.poll)
  }

  render() {
    const {poll} = this.props

    // to render a poll, the users must be loaded for the current tribe polls
    const author = this.props.users.find((u) => u.id === poll.author_id)
    if (!author) {
      return null
    }

    const user_answer = poll.answers[this.props.uid]

    const title = <span>{poll.name}</span>
    const date = <FormattedRelative value={poll.created} />

    const show_results = (user_answer && !this.state.again)

    let body
    if (show_results) {
      const answered_users = Object.keys(poll.answers)
      const counters = {}
      answered_users.forEach((uid) => {
        const user_answers = poll.answers[uid]
        user_answers.forEach((cid) => {
          if (!counters[cid]) {
            counters[cid] = 0
          }
          counters[cid]++
        })
      })
      body = (
        <List>
          {
            poll.options.map((option) => {
              const percent = Math.round((100 * counters[option.id] / answered_users.length) || 0)
              return (
                <ListItem key={option.id} primaryText={option.name + ': ' + percent + '%'} disabled={true} />
              )
            })
          }
        </List>
      )
    } else {
      if (poll.multiple) {
        body = poll.options.map((option) => (
          <Checkbox key={option.id}
            label={option.name}
            checked={this.state.choices.includes(option.id)}
            onCheck={this.handleCheck.bind(this, option.id)}
            style={{marginTop: 8}}
          />
        ))
      } else {
        body = (
          <RadioButtonGroup name={'poll_' + poll.id} onChange={this.handleChange} valueSelected={String(this.state.choices[0] || '')}>
            {poll.options.map((option) => <RadioButton key={option.id} label={option.name} value={String(option.id)} style={{marginTop: 8}} />)}
          </RadioButtonGroup>
        )
      }
    }

    return (
      <Card className={css.container} initiallyExpanded={poll.active}>
        <CardHeader title={title} subtitle={<span>{date}</span>}
          style={{height: 'auto', whiteSpace: 'nowrap'}}
          textStyle={{whiteSpace: 'normal', paddingRight: '90px'}}
          avatar={gravatar(author)}
          actAsExpander={true} showExpandableButton={true}
        />
        <CardText expandable={true} style={{paddingTop: 8}}>
          {poll.description}
        </CardText>
        <CardText expandable={true} style={{paddingTop: 0}}>
          {body}
        </CardText>
        <CardActions expandable={true}>
          {
            show_results ? (
              <FlatButton label="Vote again" onTouchTap={this.handleReset} />
            ) : (
              <FlatButton label="Submit vote" onTouchTap={this.handleSubmit} />
            )
          }
        </CardActions>
        {
          this.props.onDelete && (
            <CardActions expandable={true} style={{textAlign: 'right', marginTop: -20, marginBottom: -20}}>
              <Toggle toggled={poll.active} onToggle={this.handleToggle} style={{display: 'inline-block', width: 'auto', padding: '14px 12px 10px', verticalAlign: 'top'}} />
              <IconButton containerElement={<Link to={{pathname: routes.POLLS_EDIT.replace(':id', poll.id), state: poll}} />}>
                <EditButton color={colors.grey600} />
              </IconButton>
              <IconButton onTouchTap={this.handleDelete}>
                <DeleteButton color={colors.red400} />
              </IconButton>
            </CardActions>
          )
        }
      </Card>
    )
  }

}

Poll.propTypes = {
  // from parent component:
  poll: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  // from redux state:
  uid: PropTypes.number,
  users: PropTypes.array,
  currency: PropTypes.string,
  // action creators:
  postVote: PropTypes.func.isRequired,
  putPoll: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postVote,
  putPoll,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Poll)
