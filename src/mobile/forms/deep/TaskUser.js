import React, {Component, PropTypes} from 'react'
import {Switch, View, Text, StyleSheet} from 'react-native'

class TaskUser extends Component {
  static propTypes = {
    // from parent form:
    user: PropTypes.object.isRequired,
    checked: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(value) {
    this.props.checked.onChange(value)
  }

  render() {
    const {user, checked} = this.props

    return (
      <View style={styles.container}>
        <Switch value={checked.value} onValueChange={this.handleCheck} />
        <Text>{user.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
})

export default TaskUser
