import React, {Component, PropTypes} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Details from '../hoc/Details'
import FormattedDate from '../components/FormattedDate'
import FormattedMessage from '../components/FormattedMessage'
import Button from '../components/Button'
import Log from '../components/Log'

import postDone from '../../common/actions/postDone'

class TaskDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
    // from redux:
    task: PropTypes.object,
    uid: PropTypes.string.isRequired,
    userMap: PropTypes.object.isRequired,
    // action creators:
    postDone: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  handleDone() {
    this.props.postDone(this.props.id)
  }

  renderItem() {
    const {task, uid, userMap} = this.props

    const author = userMap[task.author]

    const uids = Object.keys(task.counters)

    let active = true
    if (task.done) {
      const elapsed = (Date.now() - task.done) / 86400000 // days
      active = (elapsed > task.wait)
    }
    const userIsConcerned = (active && task.counters[uid] !== undefined)

    //TODO: UI

    return (
      <ScrollView>
        <FormattedDate value={task.created} style={styles.info} />
        <Text style={styles.info}>Added by {author.name}</Text>
        <Text style={styles.info}>{task.description}</Text>
        {
          uids.map((id) => {
            const user = userMap[id]
            return (
              <View key={id} style={styles.info}>
                <FormattedMessage id="task_counter" values={{user: user.name, count: (task.counters[user.uid])}} />
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
        <Log type="task" item={task} />
      </ScrollView>
    )
  }

  render() {
    return (
      <Details type="task" id={this.props.id}>
        {this.props.task && this.renderItem()}
      </Details>
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

const mapStateToProps = (state) => ({
  // for <Details> HoC:
  task: state.item.task,
  // for this component:
  uid: state.user.uid,
  userMap: state.tribe.userMap,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postDone,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails)
