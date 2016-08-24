import React, {Component, PropTypes} from 'react'
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

import Link from '../components/Link'

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

  // for multiple=true: checkboxes:
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

  // for multiple=false: radio buttons:
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

    const author = userMap[poll.author]

    // to render a poll, the users must be loaded for the current tribe polls
    if (!author) {
      return null
    }

    const results = pollAnswers(poll, userMap)

    const user_answer = poll.answers && poll.answers[this.props.uid]
    const show_results = (user_answer && !this.state.again)

    let body
    if (show_results) {
      body = (
        <List>
          {
            results.map((result) => {
              const userNames = result.users.map((user) => user.name)
              return (
                <ListItem key={result.id} disabled={true}>
                  <div>{result.name}</div>
                  <Paper style={{height: 24, margin: '8px 0'}}>
                    <div style={{height: '100%', width: result.percent + '%', backgroundColor: colors.cyan500}} />
                  </Paper>
                  <div>{result.percent + '%'} {userNames.length ? '(' + userNames.join(', ') + ')' : ''}</div>
                </ListItem>
              )
            })
          }
        </List>
      )
    } else {
      if (poll.multiple) {
        body = poll.options.map((name, id) => (
          <Checkbox key={id}
            label={name}
            checked={this.state.choices.includes(id)}
            onCheck={this.handleCheck.bind(this, id)}
            style={{marginTop: 8}}
          />
        ))
      } else {
        const selectedValue = isNaN(this.state.choices[0]) ? '' : String(this.state.choices[0])
        body = (
          <RadioButtonGroup name={'poll_' + poll.id} onChange={this.handleChange} valueSelected={selectedValue}>
            {poll.options.map((name, id) => <RadioButton key={id} label={name} value={String(id)} style={{marginTop: 8}} />)}
          </RadioButtonGroup>
        )
      }
    }

    const title = <span>{poll.name}</span>
    const date = <FormattedRelative value={poll.added} />

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
