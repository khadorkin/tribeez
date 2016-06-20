import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import AsyncContent from '../hoc/AsyncContent'
import Event from '../components/Event'
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

  handleFab() {
    router.push(routes.EVENTS_NEW)
  }

  render() {
    return (
      <View style={styles.container}>
        <AsyncContent
          data={this.props.events}
          fetcher={this.props.getEvents}
          rowComponent={Event}
        />
        <Fab name="add" onPress={this.handleFab} />
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
