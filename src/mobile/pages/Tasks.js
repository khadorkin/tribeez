import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

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
      <View style={styles.container}>
        <AsyncContent name="tasks"
          renderRow={this.renderTask}
        />
        <Fab name="add" onPress={this.handleFab} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Tasks
