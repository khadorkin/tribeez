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
    uid: PropTypes.number,
    users: PropTypes.array.isRequired,
    currency: PropTypes.string,
    // from parent:
    item: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const route = routes.POLL
    route.item = this.props.item
    router.push(route)
  }

  render() {
    const {item} = this.props

    // to render a poll, the users must be loaded for the current tribe polls
    const author = this.props.users.find((u) => u.id === item.author_id)
    if (!author) {
      return null
    }

    //const user_answer = item.answers[this.props.uid]

    const num_answers = Object.keys(item.answers).length

    const date = <FormattedRelative value={item.created} />
    const subtitle = <FormattedMessage id="poll_answers" values={{num: num_answers}} />

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handlePress} style={styles.main}>
          <Image
            source={{uri: gravatar(author)}}
            style={styles.avatar}
          />
          <View style={styles.titles}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{date} — {subtitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
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
