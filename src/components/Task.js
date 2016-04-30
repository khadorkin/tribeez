import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import EditButton from 'material-ui/svg-icons/image/edit'
import DeleteButton from 'material-ui/svg-icons/action/delete'
import DoneIcon from 'material-ui/svg-icons/action/done'
import * as colors from 'material-ui/styles/colors'

import gravatar from '../utils/gravatar'

import routes from '../constants/routes'

import postDone from '../actions/postDone'

import css from './Entry.css'

class Task extends Component {

  constructor(props) {
    super(props)
    this.handleDoneTask = this.handleDoneTask.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDoneTask(event) {
    event.stopPropagation()
    this.props.postDone(this.props.task.id, this.props.uid)
  }

  handleDelete() {
    this.props.onDelete(this.props.task)
  }

  render() {
    const {task, users} = this.props

    // to render a task, the users must be loaded for the current tribe tasks
    const author = users.find((u) => u.id === task.author_id)
    if (!author) {
      return null
    }

    let subtitle
    if (task.done) {
      const date = <FormattedRelative value={task.done} />
      subtitle = <FormattedMessage id="last_done" values={{date}} />
    } else {
      subtitle = <FormattedMessage id="never_done" />
    }

    const elapsed = (Date.now() - task.done) / 86400000 // days

    let icon
    if (elapsed > task.wait) {
      icon = (
        <IconButton onTouchTap={this.handleDoneTask} style={{position: 'absolute', right: 53, top: 13}}>
          <DoneIcon />
        </IconButton>
      )
    }

    return (
      <Card className={css.container}>
        <CardHeader title={task.name} subtitle={subtitle}
          style={{height: 'auto', whiteSpace: 'nowrap'}}
          textStyle={{whiteSpace: 'normal', paddingRight: '90px'}}
          avatar={gravatar(author)}
          actAsExpander={true} showExpandableButton={true}
        >
          {icon}
        </CardHeader>
        <CardText expandable={true} style={{paddingTop: 0}}>
          {task.description}
          <List>
            {
              users.map((user) => {
                return (
                  <ListItem key={user.id} leftAvatar={<Avatar src={gravatar(user)} />} disabled={true}>
                    <FormattedMessage id="task_counter" values={{user: user.name, count: (task.counters[user.id] || 0)}} />
                  </ListItem>
                )
              })
            }
          </List>
        </CardText>
        {
          this.props.onDelete && (
            <CardActions expandable={true} style={{textAlign: 'right', marginTop: '-50px'}}>
              <IconButton containerElement={<Link to={{pathname: routes.TASKS_EDIT.replace(':id', task.id), state: task}} />}>
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

Task.propTypes = {
  // from parent component:
  task: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  // from redux:
  uid: PropTypes.number,
  users: PropTypes.array.isRequired,
  currency: PropTypes.string,
  // action creators:
  postDone: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postDone,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Task)