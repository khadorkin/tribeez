import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import Fab from '../components/Fab'
import FormattedDate from '../components/FormattedDate'

import routes from '../../common/routes'
import router from '../../common/router'

class PollDetails extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.object.isRequired,
    // from redux:
    uid: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      again: false,
    }
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    const route = routes.POLLS_EDIT
    route.edit = this.props.item
    router.push(routes.POLLS_EDIT)
  }

  render() {
    const poll = this.props.item

    const author = this.props.users.find((u) => u.id === poll.author_id)

    const user_answer = poll.answers[this.props.uid]

    const show_results = (user_answer && !this.state.again)

    let body
    if (show_results) {
      const answered_users = Object.keys(poll.answers)
      const counters = {}
      answered_users.forEach((uid) => {
        const user_answers = poll.answers[uid]
        user_answers.forEach((cid) => {
          if (!counters[cid]) {
            counters[cid] = 0
          }
          counters[cid]++
        })
      })
      body = (
        <View style={styles.info}>
          {
            poll.options.map((option) => {
              const percent = Math.round((100 * counters[option.id] / answered_users.length) || 0)
              return (
                <Text key={option.id}>{option.name + ': ' + percent + '%'}</Text>
              )
            })
          }
        </View>
      )
    } else {
      //TODO: voting form
    }

    //TODO: UI

    return (
      <View style={styles.container}>
        <FormattedDate value={poll.created} style={styles.info} />
        <Text style={styles.info}>Added by {author.name}</Text>
        {body}
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
})

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  users: state.member.tribe.users,
})

export default connect(mapStateToProps)(PollDetails)
