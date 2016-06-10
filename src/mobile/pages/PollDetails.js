import React, {Component, PropTypes} from 'react'
import {View, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {bindActionCreators} from 'redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import {connect} from 'react-redux'

import Fab from '../components/Fab'
import FormattedDate from '../components/FormattedDate'
import Button from '../components/Button'

import postVote from '../../common/actions/postVote'
import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'

import pollAnswers from '../../common/utils/pollAnswers'

class PollDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.number.isRequired,
    // from redux:
    poll: PropTypes.object.isRequired,
    uid: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
    // action creators:
    postVote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      choices: [],
      again: false,
    }
    this.handleChoice = this.handleChoice.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleFab = this.handleFab.bind(this)
  }

  handleChoice(id) {
    if (this.state.choices.includes(id)) {
      this.setState({
        choices: this.props.poll.multiple ? this.state.choices.filter((i) => i !== id) : [],
      })
    } else {
      this.setState({
        choices: this.props.poll.multiple ? [...this.state.choices, id] : [id],
      })
    }
  }

  handleVote() {
    const choices = this.state.choices
    if (choices.length) {
      this.props.postVote(this.props.poll.id, choices, this.props.uid)
      this.setState({
        again: false,
      })
    }
  }

  handleReset() {
    this.setState({
      again: true,
    })
  }

  handleFab() {
    const route = routes.POLLS_EDIT
    route.edit = this.props.poll
    router.push(routes.POLLS_EDIT)
  }

  render() {
    const {poll, users} = this.props

    const {author, total, results} = pollAnswers(poll, users)

    const show_results = (poll.answers[this.props.uid] && !this.state.again)

    let body
    if (show_results) {
      body = (
        <View style={styles.info}>
          {
            results.map((result) => (
              <View key={result.id} style={styles.result}>
                <Text>{result.name}</Text>
                <View style={styles.bar}>
                  <View style={[styles.in, {flex: result.percent}]} />
                  <View style={[styles.out, {flex: (100 - result.percent)}]} />
                </View>
                <Text>{result.percent + '%'} {result.users.length ? '(' + result.users.join(', ') + ')' : ''}</Text>
              </View>
            ))
          }
          <View style={styles.actions}>
            <Button id="vote_again" onPress={this.handleReset} />
          </View>
        </View>
      )
    } else {
      const checked_icon = poll.multiple ? 'check-box' : 'radio-button-checked'
      const unchecked_icon = poll.multiple ? 'check-box-outline-blank' : 'radio-button-unchecked'

      body = (
        <View style={styles.info}>
          {
            poll.options.map((option) => {
              const checked = this.state.choices.includes(option.id)

              return (
                <TouchableOpacity key={option.id} style={styles.option} onPress={this.handleChoice.bind(this, option.id)}>
                  <Icon size={24} color={checked ? colors.main : colors.icon} name={checked ? checked_icon : unchecked_icon} />
                  <Text style={styles.label}>{option.name}</Text>
                </TouchableOpacity>
              )
            })
          }
          <View style={styles.actions}>
            <Button id="submit_vote" onPress={this.handleVote} />
          </View>
        </View>
      )
    }

    //TODO: UI

    return (
      <View style={styles.container}>
        <ScrollView>
          <FormattedDate value={poll.created} style={styles.info} />
          <Text style={styles.info}>Added by {author.name}</Text>
          <Text style={styles.info}>{poll.description}</Text>
          {body}
          <View style={styles.spacer} />
        </ScrollView>
        {
          //TODO: allow modifying answered polls? (backend)
          total === 0 && (
            <Fab name="edit" onPress={this.handleFab} />
          )
        }
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
  result: {
    marginVertical: 10,
  },
  bar: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  in: {
    height: 24,
    backgroundColor: colors.main,
    elevation: 1,
  },
  out: {
    height: 24,
    backgroundColor: 'white',
    elevation: 1,
  },
  option: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  label: {
    marginVertical: 2,
    marginHorizontal: 8,
  },
  actions: {
    alignItems: 'center',
  },
  spacer: {
    height: 80,
  },
})

const mapStateToProps = (state, ownProps) => ({
  poll: state.polls.items.find((i) => i.id === ownProps.id),
  uid: state.member.user.id,
  users: state.member.tribe.users,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postVote,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PollDetails)
