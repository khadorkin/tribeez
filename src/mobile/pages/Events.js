import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import moment from 'moment'

import TabView from '../hoc/TabView'
import AsyncContent from '../hoc/AsyncContent'
import Event from '../components/Event'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'
import getUpcomingEvents from '../../common/actions/getUpcomingEvents'
import getPastEvents from '../../common/actions/getPastEvents'

const sectionSplitter = (event) => {
  return moment(event.start).format('MMMM YYYY')
}

class Events extends Component {
  static propTypes = {
    // redux state:
    upcomingevents: PropTypes.object.isRequired,
    pastevents: PropTypes.object.isRequired,
    // action creators:
    getUpcomingEvents: PropTypes.func.isRequired,
    getPastEvents: PropTypes.func.isRequired,
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
          <AsyncContent
            data={this.props.upcomingevents}
            fetcher={this.props.getUpcomingEvents}
            rowComponent={Event}
            splitter={sectionSplitter}
            tabLabel="tab.upcoming"
          />
          <AsyncContent
            data={this.props.pastevents}
            fetcher={this.props.getPastEvents}
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

const mapStateToProps = (state) => ({
  upcomingevents: state.upcomingevents,
  pastevents: state.pastevents,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUpcomingEvents,
  getPastEvents,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Events)
