import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import AsyncContent from '../hoc/AsyncContent'

import Task from '../components/Task'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getTasks from '../actions/getTasks'
import deleteTask from '../actions/deleteTask'

class Tasks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      task: {},
    }
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  handleDialogOpen(task) {
    this.setState({
      openDialog: true,
      task,
    })
  }

  handleDelete() {
    this.props.deleteTask(this.state.task.id)
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  render() {
    const {tasks} = this.props

    const dialogActions = [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label={<FormattedMessage id="delete" />}
        primary={true}
        onTouchTap={this.handleDelete}
      />,
    ]

    return (
      <AsyncContent fetcher={this.props.getTasks} data={tasks}>
        {
          tasks.items.map((task) =>
            <Task task={task} key={task.id} onDelete={this.handleDialogOpen} />
          )
        }

        <Dialog title={this.state.task.name}
          actions={dialogActions}
          open={this.state.openDialog}
          onRequestClose={this.handleDialogClose}
        >
          <FormattedMessage id="delete_dialog" values={{type: 'task'}} />
        </Dialog>

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.TASKS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </AsyncContent>
    )
  }

}

Tasks.propTypes = {
  // redux state:
  tasks: PropTypes.object.isRequired,
  // action creators:
  getTasks: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTasks,
  deleteTask,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
