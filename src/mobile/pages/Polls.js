import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

import AsyncContent from '../hoc/AsyncContent'
import Poll from '../components/Poll'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'

class Polls extends Component {
  static propTypes = {
    //
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    const route = routes.POLLS_NEW
    route.edit = null
    router.push(route)
  }

  renderPoll(row) {
    return <Poll poll={row} />
  }

  render() {
    return (
      <View style={styles.container}>
        <AsyncContent name="polls"
          renderRow={this.renderPoll}
        />
        <Fab name="add" onPress={this.handleFab} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Polls
