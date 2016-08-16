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

const oneHourAgo = Date.now() - 3600000

class Events extends Component {
  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    const route = routes.EVENTS_NEW
    route.props = {} // clear 'edit' prop = null
    router.push(route)
  }

  renderEvent(row) {
    return <Event event={row} />
  }

  render() {
    return (
      <View style={styles.container}>
        <TabView>
          <AsyncContent name="events"
            orderBy="index"
            startAt={oneHourAgo}
            ascending={true}
            renderRow={this.renderEvent}
            splitter={sectionSplitter}
            tabLabel="tab.upcoming"
          />
          <AsyncContent name="events"
            orderBy="index"
            startAt={oneHourAgo}
            ascending={false}
            splitter={sectionSplitter}
            renderRow={this.renderEvent}
            tabLabel="tab.past"
          />
        </TabView>
        <Fab name="add" onPress={this.handleFab} type="events" />
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
