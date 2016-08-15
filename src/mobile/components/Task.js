import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text} from 'react-native'

import {connect} from 'react-redux'

import ListItem from '../components/ListItem'
import FormattedMessage from './FormattedMessage'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'

class Task extends Component {
  static propTypes = {
    // from redux:
    uid: PropTypes.string,
    userMap: PropTypes.object.isRequired,
    currency: PropTypes.string,
    // from parent:
    task: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const route = routes.TASK
    route.props = {
      id: this.props.task.id,
    }
    route.title = this.props.task.name
    router.push(route)
  }

  render() {
    const {task} = this.props

    // to render a task, the users must be loaded for the current tribe tasks
    const author = this.props.userMap[task.author]
    if (!author) {
      return null
    }

    let subtitle
    if (task.done) {
      subtitle = <FormattedMessage id="last_done" values={{ago: task.done}} />
    } else {
      subtitle = <FormattedMessage id="never_done" />
    }

    return (
      <ListItem user={author} onPress={this.handlePress}>
        <Text style={styles.title}>{task.name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
  uid: state.user.uid,
  userMap: state.tribe.userMap,
  currency: state.tribe.currency,
})

const styles = StyleSheet.create({
  title: {
    color: colors.primaryText,
  },
  subtitle: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Task)
