import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import EditButton from 'material-ui/svg-icons/image/edit'
import DeleteButton from 'material-ui/svg-icons/action/delete'
import Paper from 'material-ui/Paper'
import * as colors from 'material-ui/styles/colors'

import gravatar from '../../common/utils/gravatar'
import pollAnswers from '../../common/utils/pollAnswers'

import routes from '../routes'

import postVote from '../../common/actions/postVote'

class Poll extends Component {
  static propTypes = {
    // from parent component:
    poll: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    // from redux:
    uid: PropTypes.string,
    userMap: PropTypes.object.isRequired,
    currency: PropTypes.string,
    // action creators:
    postVote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      choices: [],
      again: false,
    }
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleDelete() {
    this.props.onDelete(this.props.poll)
  }

  render() {
    const {poll, userMap} = this.props

    const author = userMap[poll.author_id]

    // to render a poll, the users must be loaded for the current tribe polls
    if (!author) {
      return null
    }

    const hasAnswers = Object.keys(poll.answers).length > 0

    const results = pollAnswers(poll, userMap)

    const user_answer = poll.answers[this.props.uid]
    const show_results = (user_answer && !this.state.again)

    let body
    if (show_results) {
      body = (
        <List>
          {
            results.map((result) => {
              return (
                <ListItem key={result.id} disabled={true}>
                  <div>{result.name}</div>
                  <Paper style={{height: 24, margin: '8px 0'}}>
                    <div style={{height: '100%', width: result.percent + '%', backgroundColor: colors.cyan500}}></div>
                  </Paper>
                  <div>{result.percent + '%'} {result.users.length ? '(' + result.users.join(', ') + ')' : ''}</div>
                </ListItem>
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

    const title = <span>{poll.name}</span>
    const date = <FormattedRelative value={poll.created} />

    return (
      <Card style={styles.container} initiallyExpanded={!user_answer}>
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
              <FlatButton label={<FormattedMessage id="vote_again" />} onTouchTap={this.handleReset} />
            ) : (
              <FlatButton label={<FormattedMessage id="submit_vote" />} onTouchTap={this.handleSubmit} />
            )
          }
        </CardActions>
        {
          this.props.onDelete && (
            <CardActions expandable={true} style={{textAlign: 'right', marginTop: -20}}>
              {
                hasAnswers && (
                  <IconButton containerElement={<Link to={{pathname: routes.POLLS_EDIT.replace(':key', poll.id), state: poll}} />}>
                    <EditButton color={colors.grey600} />
                  </IconButton>
                )
              }
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

const styles = {
  container: {
    margin: '15px 10px 0',
  },
}

const mapStateToProps = (state) => ({
  uid: state.user.uid,
  userMap: state.tribe.userMap,
  currency: state.tribe.currency,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postVote,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Poll)
