import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators, compose} from 'redux'
import {FormattedMessage, FormattedDate, injectIntl, intlShape} from 'react-intl'
import {Link} from 'react-router'

import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import AsyncContent from '../hoc/AsyncContent'

import Dialog from 'material-ui/lib/dialog'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import DescIcon from 'material-ui/lib/svg-icons/action/description'
import StartIcon from 'material-ui/lib/svg-icons/action/flight-land'
import EndIcon from 'material-ui/lib/svg-icons/action/flight-takeoff'
import LocationIcon from 'material-ui/lib/svg-icons/maps/place'
import UrlIcon from 'material-ui/lib/svg-icons/content/link'
import IconButton from 'material-ui/lib/icon-button'
import EditButton from 'material-ui/lib/svg-icons/image/edit'
import DeleteButton from 'material-ui/lib/svg-icons/action/delete'
import * as colors from 'material-ui/lib/styles/colors'
import FlatButton from 'material-ui/lib/flat-button'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getEvents from '../actions/getEvents'
import deleteEvent from '../actions/deleteEvent'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
)
const startAccessor = (event) => new Date(event.start)
const endAccessor = (event) => (event.end ? new Date(event.end) : new Date(event.start))

const eventPropGetter = (/*event, start, end, isSelected*/) => ({style: {backgroundColor: colors.deepOrange300}})

const infos = [
  {id: 'description', icon: <DescIcon />},
  {id: 'start', icon: <StartIcon />, date: true},
  {id: 'end', icon: <EndIcon />, date: true},
  {id: 'location', icon: <LocationIcon />, map: true},
  {id: 'url', icon: <UrlIcon />, link: true},
]

class Events extends Component {

  constructor(props) {
    super(props)
    this.state = {
      event: {},
      openDelete: false,
    }
    this.handleSelectEvent = this.handleSelectEvent.bind(this)
    this.handleDetailsClose = this.handleDetailsClose.bind(this)
    this.handleDeleteOpen = this.handleDeleteOpen.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteClose = this.handleDeleteClose.bind(this)
  }

  handleSelectEvent(event) {
    this.setState({
      event,
    })
  }

  handleDetailsClose() {
    this.setState({
      event: {},
    })
  }

  handleDeleteOpen() {
    this.setState({
      openDelete: true,
    })
  }

  handleDelete() {
    this.props.deleteEvent(this.state.event.id)
    this.handleDeleteClose()
    this.handleDetailsClose()
  }

  handleDeleteClose() {
    this.setState({
      openDelete: false,
    })
  }

  render() {
    const {events, intl: {formatMessage}} = this.props
    const {event} = this.state

    const detailsActions = [
      <IconButton containerElement={<Link to={{pathname: routes.EVENTS_EDIT.replace(':id', event.id), state: event}} />}>
        <EditButton color={colors.grey600} />
      </IconButton>,
      <IconButton onTouchTap={this.handleDeleteOpen}>
        <DeleteButton color={colors.red400} />
      </IconButton>,
    ]

    const deleteActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDeleteClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.handleDelete}
      />,
    ]

    const messages = {
      allDay: formatMessage({id: 'calendar.allDay'}),
      previous: formatMessage({id: 'calendar.previous'}),
      next: formatMessage({id: 'calendar.next'}),
      today: formatMessage({id: 'calendar.today'}),
      month: formatMessage({id: 'calendar.month'}),
      week: formatMessage({id: 'calendar.week'}),
      day: formatMessage({id: 'calendar.day'}),
      agenda: formatMessage({id: 'calendar.agenda'}),
    }

    const views = ['month', 'week', 'agenda']

    return (
      <AsyncContent fetcher={this.props.getEvents} data={events}>
        <BigCalendar
          style={{height: '550px', backgroundColor: 'white', padding: 16}}
          events={events.items}
          popup={true}
          views={views}
          culture={this.props.lang}
          titleAccessor="name"
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          onSelectEvent={this.handleSelectEvent}
          messages={messages}
          eventPropGetter={eventPropGetter}
        />

        <Dialog title={event.name}
          actions={detailsActions}
          open={Boolean(event.id)}
          onRequestClose={this.handleDetailsClose}
        >
          <List>
            {
              infos.filter((info) => event[info.id]) // remove undefined infos
                   .map((info) => {
                     let value = event[info.id]
                     if (info.date) {
                       const date = new Date(value)
                       if (date.getHours() !== 0 || date.getMinutes() !== 0) {
                         value = <FormattedMessage id="datetime" values={{date}} />
                       } else {
                         value = <FormattedDate value={date} day="numeric" month="long" />
                       }
                     }
                     let href = null
                     if (info.link) {
                       href = value
                       value = value.replace(/^(https?:\/\/|)(www\.|)/, '')
                     }
                     if (info.map) {
                       href = 'https://www.google.com/maps?q=' + encodeURIComponent(value)
                     }
                     return <ListItem key={info.id} leftIcon={info.icon} primaryText={value} disabled={!href} href={href} />
                   })
            }
          </List>
        </Dialog>

        <Dialog title="Delete event"
          actions={deleteActions}
          open={this.state.openDelete}
          onRequestClose={this.handleDeleteClose}
        >
          Delete "{event.name}"?
        </Dialog>

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.EVENTS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </AsyncContent>
    )
  }

}

Events.propTypes = {
  intl: intlShape.isRequired,
  // redux state:
  lang: PropTypes.string.isRequired,
  events: PropTypes.object,
  // action creators:
  getEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  lang: state.app.lang,
  events: state.events,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getEvents,
  deleteEvent,
}, dispatch)

export default compose(
  injectIntl,
  connect(mapStateToProps, mapDispatchToProps),
)(Events)
