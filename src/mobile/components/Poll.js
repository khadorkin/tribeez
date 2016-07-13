import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'

import {connect} from 'react-redux'

import FormattedRelative from './FormattedRelative'
import FormattedMessage from './FormattedMessage'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Poll extends Component {
  static propTypes = {
    // from redux:
    uid: PropTypes.string,
    userMap: PropTypes.object.isRequired,
    currency: PropTypes.string,
    // from parent:
    poll: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const route = routes.POLL
    route.item = this.props.poll
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

    const date = <FormattedRelative value={poll.added} />
    const subtitle = <FormattedMessage id="poll_answers" values={{num: num_answers}} />

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handlePress} style={styles.main}>
          <Image
            source={{uri: gravatar(author)}}
            style={styles.avatar}
          />
          <View style={styles.titles}>
            <Text style={styles.title}>{poll.name}</Text>
            <Text style={styles.subtitle}>{date} — {subtitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  uid: state.user.uid,
  userMap: state.tribe.userMap,
  currency: state.tribe.currency,
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    elevation: 1,
  },
  main: {
    padding: 10,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  titles: {
    flex: 1,
  },
  title: {
    color: colors.primaryText,
  },
  subtitle: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Poll)
