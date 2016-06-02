import React, {Component, PropTypes} from 'react'
import {ScrollView, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Event from '../components/Event'
import Spinner from '../components/Spinner'

import getEvents from '../../common/actions/getEvents'

class Events extends Component {
  static propTypes = {
    // redux state:
    events: PropTypes.object.isRequired,
    // action creators:
    getEvents: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getEvents(15)
  }

  render() {
    const {events} = this.props

    return (
      <ScrollView style={styles.container}>
        {
          events.items.map((event) =>
            <Event event={event} key={event.id} />
          )
        }
        <Spinner visible={events.loading} />
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
})

const mapStateToProps = (state) => ({
  events: state.events,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getEvents,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Events)
