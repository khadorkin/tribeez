import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Details from '../hoc/Details'
import FormattedMessage from '../components/FormattedMessage'
import Button from '../components/Button'
import Avatar from '../components/Avatar'

import colors from '../../common/constants/colors'
import postDone from '../../common/actions/postDone'

// wether to show the button or not (for concerned users):
const MIN_WAIT_ZERO = 600000 // 10 minutes
const MIN_WAIT_MORE = 43200000 // 12 hours

class TaskDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
    // action creators:
    postDone: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.renderBody = this.renderBody.bind(this)
    this.handleDone = this.handleDone.bind(this)
  }

  handleDone() {
    this.props.postDone(this.props.id)
  }

  mapper(task, userMap) {
    let message = 'never_done'
    let icon = 'thumb-down'
    const values = {}
    if (task.done) {
      values.ago = task.done
      icon = 'thumb-up'
      if (task.done_by) {
        message = 'last_done_by'
        values.user = userMap[task.done_by].name
      } else {
        message = 'last_done'
      }
    }

    return [
      {
        id: 'author',
        icon: 'person',
        message: 'created_by',
        values: {author: userMap[task.author].name},
      },
      {
        id: 'description',
        icon: 'description',
        text: task.description,
      },
      {
        id: 'wait',
        icon: 'schedule',
        message: 'task_wait',
        values: {num: task.wait},
      },
      {
        id: 'done',
        icon,
        message,
        values,
      },
    ]
  }

  renderBody(task, userMap, uid) {
    let showButton = (task.counters[uid] !== undefined)

    if (showButton && task.done) {
      const elapsed = Date.now() - task.done
      const wait = task.wait ? MIN_WAIT_MORE : MIN_WAIT_ZERO
      if (elapsed < wait) {
        showButton = false
      }
    }

    // smallest counters first:
    const keys = Object.keys(task.counters).sort((a, b) => {
      const av = task.counters[a]
      const bv = task.counters[b]
      return av > bv ? 1 : (av < bv ? -1 : 0)
    })

    return (
      <View style={styles.body}>
        <FormattedMessage id="counters" style={styles.title} />
        {
          keys.map((id) => {
            const user = userMap[id]

            return (
              <View style={styles.part} key={id}>
                <Avatar user={user} />
                <FormattedMessage id="task_counter" values={{user: user.name, count: task.counters[id]}} style={styles.counter} />
              </View>
            )
          })
        }
        {
          showButton && (
            <Button id="mark_done" onPress={this.handleDone} style={styles.button} />
          )
        }
      </View>
    )
  }

  render() {
    return (
      <Details type="task" id={this.props.id} mapper={this.mapper} renderBody={this.renderBody} />
    )
  }
}

const styles = StyleSheet.create({
  body: {
    margin: 16,
    borderTopWidth: 1,
    borderTopColor: colors.underline,
  },
  title: {
    color: colors.primaryText,
    fontSize: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  part: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  counter: {
    flex: 1,
    color: colors.primaryText,
    fontSize: 16,
    marginLeft: 24,
  },
  button: {
    marginTop: 24,
  },
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postDone,
}, dispatch)

export default connect(null, mapDispatchToProps)(TaskDetails)
