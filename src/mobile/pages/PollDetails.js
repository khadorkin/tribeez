import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Details from '../hoc/Details'
import Checkbox from '../components/Checkbox'
import Button from '../components/Button'
import Avatar from '../components/Avatar'

import colors from '../../common/constants/colors'
import postVote from '../../common/actions/postVote'

import pollAnswers from '../../common/utils/pollAnswers'

class PollDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
    // from redux:
    poll: PropTypes.object,
    // action creators:
    postVote: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      choices: {},
      again: false,
    }
    this.renderBody = this.renderBody.bind(this)
    this.handleChoice = this.handleChoice.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  shouldComponentUpdate() {
    return true
  }

  handleChoice(id, value) {
    const multiple = this.props.poll.multiple

    if (multiple) {
      this.setState({
        choices: {...this.state.choices, [id]: value || null}, // replace false by null to not store it in firebase
      })
    } else {
      this.setState({
        choices: {[id]: true},
      })
    }
  }

  handleVote() {
    const choices = this.state.choices
    if (Object.keys(choices).length > 0) {
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

  mapper(poll, userMap) {
    return [
      {
        id: 'author',
        icon: 'person',
        message: 'created_by',
        values: {author: userMap[poll.author].name},
      },
      {
        id: 'description',
        icon: 'description',
        text: poll.description,
      },
    ]
  }

  renderForm(options, multiple) {
    return (
      <View style={styles.body}>
        {
          options.map((option, id) =>
            <Checkbox key={id}
              multiple={multiple}
              value={this.state.choices[id] || false}
              onChange={this.handleChoice.bind(this, id)}
              style={styles.option}
              textStyle={styles.optionText}
            >
              {option}
            </Checkbox>
          )
        }
        <Button id="submit_vote" onPress={this.handleVote} />
      </View>
    )
  }

  renderResult(results) {
    return (
      <View style={styles.body}>
        {
          results.map((result) => (
            <View key={result.id} style={styles.result}>
              <Text style={styles.resultName}>{result.name}</Text>
              <View style={styles.chart}>
                <Text style={styles.percent}>{result.percent + '%'}</Text>
                <View style={styles.bar}>
                  <View style={[styles.in, {flex: result.percent}]} />
                  <View style={[styles.out, {flex: (100 - result.percent)}]} />
                </View>
              </View>
              <View style={styles.users}>
                {
                  result.users.map((user) =>
                    <Avatar key={user.uid} user={user} style={styles.avatar} />
                  )
                }
              </View>
            </View>
          ))
        }
        <Button id="vote_again" onPress={this.handleReset} flat={true} />
      </View>
    )
  }

  renderBody(poll, userMap, uid) {
    if (poll.answers && poll.answers[uid] && !this.state.again) {
      return this.renderResult(pollAnswers(poll, userMap))
    } else {
      return this.renderForm(poll.options, poll.multiple)
    }
  }

  render() {
    return (
      <Details type="poll"
        id={this.props.id}
        mapper={this.mapper}
        renderBody={this.renderBody}
        state={this.state} //hack so that it re-renders when state changes
      />
    )
  }
}

const styles = StyleSheet.create({
  option: {
    paddingLeft: 1,
  },
  optionText: {
    fontSize: 20,
    color: colors.main,
    paddingHorizontal: 10,
    flex: 1,
  },
  body: {
    margin: 16,
  },
  result: {
    marginVertical: 10,
  },
  resultName: {
    fontSize: 20,
    color: colors.main,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  percent: {
    fontSize: 20,
    color: colors.main,
    width: 60,
  },
  bar: {
    flex: 1,
    marginVertical: 5,
    flexDirection: 'row',
  },
  in: {
    height: 16,
    backgroundColor: colors.main,
  },
  out: {
    height: 16,
    backgroundColor: colors.background,
  },
  users: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    marginRight: 12,
  },
})

const mapStateToProps = (state) => ({
  poll: state.item.poll,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postVote,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PollDetails)
