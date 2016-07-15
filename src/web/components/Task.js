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

import gravatar from '../../common/utils/gravatar'

import routes from '../routes'

import postDone from '../../common/actions/postDone'

class Task extends Component {
  static propTypes = {
    // from parent component:
    task: PropTypes.object.isRequired,
    onDelete: PropTypes.func,
    // from redux:
    uid: PropTypes.string,
    userMap: PropTypes.object.isRequired,
    // action creators:
    postDone: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleDoneTask = this.handleDoneTask.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDoneTask(event) {
    event.stopPropagation()
    this.props.postDone(this.props.task.id)
  }

  handleDelete() {
    this.props.onDelete(this.props.task)
  }

  render() {
    const {task, uid, userMap} = this.props

    // to render a task, the users must be loaded for the current tribe tasks
    const author = userMap[task.author]
    if (!author) {
      return null
    }

    let subtitle
    if (task.done) {
      const ago = <FormattedRelative value={task.done} />
      subtitle = <FormattedMessage id="last_done" values={{ago}} />
    } else {
      subtitle = <FormattedMessage id="never_done" />
    }

    let active = true
    if (task.done) {
      const elapsed = (Date.now() - task.done) / 86400000 // days
      active = (elapsed > task.wait)
    }
    const userIsConcerned = (active && task.counters[uid] !== undefined)

    const icon = userIsConcerned && (
      <IconButton onTouchTap={this.handleDoneTask} style={{position: 'absolute', right: 53, top: 13}}>
        <DoneIcon />
      </IconButton>
    )

    const uids = Object.keys(task.counters)

    return (
      <Card style={styles.container}>
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
              uids.map((id) => {
                const user = userMap[id]
                return (
                  <ListItem key={id} leftAvatar={<Avatar src={gravatar(user)} />} disabled={true}>
                    <FormattedMessage id="task_counter" values={{user: user.name, count: (task.counters[id])}} />
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

const styles = {
  container: {
    margin: '15px 10px 0',
  },
}

const mapStateToProps = (state) => ({
  uid: state.user.uid,
  userMap: state.tribe.userMap,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postDone,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Task)
