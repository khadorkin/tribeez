import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AsyncContent from '../hoc/AsyncContent'
import Task from '../components/Task'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'
import getTasks from '../../common/actions/getTasks'

class Tasks extends Component {
  static propTypes = {
    // redux state:
    tasks: PropTypes.object.isRequired,
    // action creators:
    getTasks: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    router.push(routes.TASKS_NEW)
  }

  render() {
    return (
      <View style={styles.container}>
        <AsyncContent
          data={this.props.tasks}
          fetcher={this.props.getTasks}
          rowComponent={Task}
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

const mapStateToProps = (state) => ({
  tasks: state.tasks,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTasks,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
