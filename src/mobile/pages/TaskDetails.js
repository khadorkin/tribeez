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
    ]
  }

  renderBody(task, userMap, uid) {
    let active = true
    if (task.done) {
      const elapsed = Date.now() - task.done
      const wait = (task.wait * 86400000) || 600000 // minimum 10 minutes
      active = (elapsed > wait)
    }
    const userIsConcerned = (active && task.counters[uid] !== undefined)

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
          userIsConcerned && (
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
