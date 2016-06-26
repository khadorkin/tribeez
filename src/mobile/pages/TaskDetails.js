import React, {Component, PropTypes} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Details from '../hoc/Details'
import FormattedDate from '../components/FormattedDate'
import FormattedMessage from '../components/FormattedMessage'
import Button from '../components/Button'
import Log from '../components/Log'

import getItem from '../../common/actions/getTask'
import postDone from '../../common/actions/postDone'
import routes from '../../common/routes'

class TaskDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.number.isRequired,
    // from redux:
    item: PropTypes.object,
    uid: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
    // action creators:
    postDone: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  handleDone() {
    this.props.postDone(this.props.item.id, this.props.uid)
  }

  renderItem(task) {
    const {users, uid} = this.props

    const usersById = {}
    users.forEach((user) => {
      usersById[user.id] = user
    })

    const author = usersById[task.author_id]

    const uids = Object.keys(task.counters)

    const elapsed = (Date.now() - task.done) / 86400000 // days
    const userIsConcerned = (elapsed > task.wait && task.counters[uid] !== undefined)

    //TODO: UI

    return (
      <ScrollView>
        <FormattedDate value={task.created} style={styles.info} />
        <Text style={styles.info}>Added by {author.name}</Text>
        <Text style={styles.info}>{task.description}</Text>
        {
          uids.map((id) => {
            const user = usersById[id]
            return (
              <View key={id} style={styles.info}>
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
        <Log type="task" id={task.id} />
      </ScrollView>
    )
  }

  render() {
    return (
      <Details
        {...this.props}
        render={this.renderItem}
        editRoute={routes.TASKS_EDIT}
      />
    )
  }
}

const styles = StyleSheet.create({
  info: {
    margin: 10,
  },
  actions: {
    alignItems: 'center',
  },
})

const mapStateToProps = (state, ownProps) => ({
  // for <Details> HoC:
  item: state.tasks.items.find((i) => i.id === ownProps.id)
     || state.tasks.current,
  loading: state.tasks.loading,
  error: state.tasks.error,
  // for this component:
  uid: state.member.user.id,
  users: state.member.tribe.users,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  // for HoC:
  getItem,
  // for this component:
  postDone,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)
