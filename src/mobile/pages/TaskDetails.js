import React, {Component, PropTypes} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import {bindActionCreators} from 'redux'

import {connect} from 'react-redux'

import Fab from '../components/Fab'
import FormattedDate from '../components/FormattedDate'
import FormattedMessage from '../components/FormattedMessage'
import Button from '../components/Button'

import postDone from '../../common/actions/postDone'
import routes from '../../common/routes'
import router from '../../common/router'
//import colors from '../../common/constants/colors'

class TaskDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.number.isRequired,
    // from redux:
    task: PropTypes.object.isRequired,
    uid: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
    // action creators:
    postDone: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  handleDone() {
    this.props.postDone(this.props.task.id, this.props.uid)
  }

  handleFab() {
    const route = routes.TASKS_EDIT
    route.edit = this.props.task
    router.push(route)
  }

  render() {
    const {task} = this.props

    const usersById = {}
    this.props.users.forEach((user) => {
      usersById[user.id] = user
    })

    const author = usersById[task.author_id]

    const uids = Object.keys(task.counters)

    const elapsed = (Date.now() - task.done) / 86400000 // days
    const userIsConcerned = (elapsed > task.wait && task.counters[this.props.uid] !== undefined)

    //TODO: UI

    return (
      <View style={styles.container}>
        <ScrollView>
          <FormattedDate value={task.created} style={styles.info} />
          <Text style={styles.info}>Added by {author.name}</Text>
          <Text style={styles.info}>{task.description}</Text>
          {
            uids.map((uid) => {
              const user = usersById[uid]
              return (
                <View key={uid} style={styles.info}>
                  <FormattedMessage id="task_counter" values={{user: user.name, count: (task.counters[user.id])}} />
                </View>
              )
            })
          }
          {
            userIsConcerned && (
              <View style={styles.actions}>
                <Button id="mark_done" onPress={this.handleDone} />
              </View>
            )
          }
          <View style={styles.spacer} />
        </ScrollView>
        <Fab name="edit" onPress={this.handleFab} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    backgroundColor: 'white',
    flex: 1,
  },
  info: {
    margin: 10,
  },
  actions: {
    alignItems: 'center',
  },
  spacer: {
    height: 80,
  },
})

const mapStateToProps = (state, ownProps) => ({
  task: state.tasks.items.find((i) => i.id === ownProps.id),
  uid: state.member.user.id,
  users: state.member.tribe.users,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postDone,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)
