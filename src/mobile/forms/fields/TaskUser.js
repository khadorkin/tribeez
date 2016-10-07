import React, {Component, PropTypes} from 'react'
import {Switch, View, Text, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

class TaskUser extends Component {
  static propTypes = {
    // from parent form:
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(value) {
    const {input} = this.props

    input.onChange({
      uid: input.value.uid,
      checked: value,
    })
  }

  render() {
    const {input: {value: {uid, checked}}, userMap} = this.props

    const user = userMap[uid]

    return (
      <View style={styles.container}>
        <Switch value={checked} onValueChange={this.handleCheck} />
        <Text style={styles.label}>{user.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  label: {
    marginVertical: 2,
    marginHorizontal: 8,
    fontSize: 16,
  },
})

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
})

export default connect(mapStateToProps)(TaskUser)
