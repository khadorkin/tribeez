import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

import moment from 'moment'

import TabView from '../hoc/TabView'
import AsyncContent from '../hoc/AsyncContent'
import Event from '../components/Event'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'

const sectionSplitter = (event) => {
  return moment(event.start).format('MMMM YYYY')
}

class Events extends Component {
  static propTypes = {
    //
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    router.push(routes.EVENTS_NEW)
  }

  render() {
    return (
      <View style={styles.container}>
        <TabView>
          <AsyncContent name="events"
            rowComponent={Event}
            splitter={sectionSplitter}
            tabLabel="tab.upcoming"
          />
          <AsyncContent name="events"
            splitter={sectionSplitter}
            rowComponent={Event}
            tabLabel="tab.past"
          />
        </TabView>
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

export default Events
