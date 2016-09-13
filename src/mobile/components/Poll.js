import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text} from 'react-native'

import {connect} from 'react-redux'

import ListItem from '../components/ListItem'
import FormattedRelative from './FormattedRelative'
import FormattedMessage from './FormattedMessage'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'

class Poll extends Component {
  static propTypes = {
    // from parent:
    poll: PropTypes.object.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const route = routes.POLL
    route.props = {
      id: this.props.poll.id,
    }
    route.title = this.props.poll.name
    router.push(route)
  }

  render() {
    const {poll} = this.props

    // to render a poll, the users must be loaded for the current tribe polls
    const author = this.props.userMap[poll.author]
    if (!author) {
      return null
    }

    //const user_answer = poll.answers && poll.answers[this.props.uid]

    const num_answers = poll.answers ? Object.keys(poll.answers).length : 0

    const rightLabel = <FormattedRelative value={poll.added} style={styles.time} />

    return (
      <ListItem user={author} onPress={this.handlePress} rightLabel={rightLabel}>
        <Text style={styles.title}>{poll.name}</Text>
        <FormattedMessage id="poll_answers" values={{num: num_answers}} style={styles.subtitle} />
      </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
})

const styles = StyleSheet.create({
  title: {
    color: colors.polls,
    fontSize: 16,
  },
  subtitle: {
    color: colors.secondaryText,
    fontStyle: 'italic',
    marginTop: 8,
  },
  time: {
    fontStyle: 'italic',
    color: colors.secondaryText,
    marginLeft: 16,
  },
})

export default connect(mapStateToProps)(Poll)
