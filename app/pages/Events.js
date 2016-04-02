import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import AsyncContent from '../hoc/AsyncContent'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getEvents from '../actions/getEvents'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
)

class Events extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: new Date(),
    }
    this.handleLoad = this.handleLoad.bind(this)
  }

  handleLoad() {
    if (!this.props.events.got) {
      this.props.getEvents()
    }
  }

  render() {
    const {events} = this.props

    return (
      <AsyncContent onLoad={this.handleLoad} error={events.error}>
        <BigCalendar
          style={{height: '500px', backgroundColor: 'white', padding: 16}}
          events={events.list}
          defaultDate={this.state.current}
          culture={this.props.lang}
        />

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.EVENTS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </AsyncContent>
    )
  }

}

Events.propTypes = {
  // redux state:
  lang: PropTypes.string.isRequired,
  events: PropTypes.object,
  // action creators:
  getEvents: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  lang: state.app.lang,
  events: state.events,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getEvents,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Events)
