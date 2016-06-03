import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Event from '../components/Event'
import Spinner from '../components/Spinner'
import Fab from '../components/Fab'

import routes from '../../common/routes'
import router from '../../common/router'
import getEvents from '../../common/actions/getEvents'

class Events extends Component {
  static propTypes = {
    // redux state:
    events: PropTypes.object.isRequired,
    // action creators:
    getEvents: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  componentDidMount() {
    this.props.getEvents(15)
  }

  handleFab() {
    router.push(routes.EVENTS_NEW)
  }

  render() {
    const {events} = this.props

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            events.items.map((event) =>
              <Event event={event} key={event.id} />
            )
          }
          <Spinner visible={events.loading} />
        </ScrollView>
        <Fab onPress={this.handleFab} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  events: state.events,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getEvents,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Events)
