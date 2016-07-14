import React, {Component, PropTypes} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Details from '../hoc/Details'
import FormattedDate from '../components/FormattedDate'
import Touchable from '../components/Touchable'
import Button from '../components/Button'
import Log from '../components/Log'

import postVote from '../../common/actions/postVote'
import routes from '../../common/routes'
import colors from '../../common/constants/colors'

import pollAnswers from '../../common/utils/pollAnswers'

class PollDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
    // from redux:
    poll: PropTypes.object,
    uid: PropTypes.string.isRequired,
    userMap: PropTypes.object.isRequired,
    // action creators:
    postVote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      choices: [],
      again: false,
    }
    this.renderItem = this.renderItem.bind(this)
    this.handleChoice = this.handleChoice.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleReset = this.handleReset.bind(this)
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
      this.props.postVote(this.props.poll.id, choices)
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

  renderItem() {
    const {poll, userMap} = this.props

    const author = userMap[poll.author]

    const results = pollAnswers(poll, userMap)

    const show_results = (poll.answers && poll.answers[this.props.uid] && !this.state.again)

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
            poll.options.map((option, id) => {
              const checked = this.state.choices.includes(id)

              return (
                <Touchable key={id} style={styles.option} onPress={this.handleChoice.bind(this, id)}>
                  <Icon size={24} color={checked ? colors.main : colors.icon} name={checked ? checked_icon : unchecked_icon} />
                  <Text style={styles.label}>{option}</Text>
                </Touchable>
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
      <ScrollView>
        <FormattedDate value={poll.created} style={styles.info} />
        <Text style={styles.info}>Added by {author.name}</Text>
        <Text style={styles.info}>{poll.description}</Text>
        {body}
        <Log type="poll" item={poll} />
      </ScrollView>
    )
  }

  render() {
    return (
      <Details type="poll"
        id={this.props.id}
        item={this.props.poll}
        editRoute={routes.POLLS_EDIT}
      >
        {this.props.poll && this.renderItem()}
      </Details>
    )
  }
}

const styles = StyleSheet.create({
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
})

const mapStateToProps = (state) => ({
  // for <Details> HoC:
  poll: state.item.poll,
  // for this component:
  uid: state.user.uid,
  userMap: state.tribe.userMap,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postVote,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PollDetails)
