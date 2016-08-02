import React, {Component} from 'react'

import PageView from '../hoc/PageView'
import AsyncContent from '../hoc/AsyncContent'
import Task from '../components/Task'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'

class Tasks extends Component {
  static propTypes = {
    //
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    const route = routes.TASKS_NEW
    route.edit = null
    router.push(route)
  }

  renderTask(row) {
    return <Task task={row} />
  }

  render() {
    return (
      <PageView>
        <AsyncContent name="tasks"
          renderRow={this.renderTask}
        />
        <Fab name="add" onPress={this.handleFab} />
      </PageView>
    )
  }
}

export default Tasks
