import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedDate} from 'react-intl'
import {Link} from 'react-router'

import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import AsyncContent from '../hoc/AsyncContent'

import Dialog from 'material-ui/Dialog'
import {List, ListItem} from 'material-ui/List'
import DescIcon from 'material-ui/svg-icons/action/description'
import StartIcon from 'material-ui/svg-icons/action/flight-land'
import EndIcon from 'material-ui/svg-icons/action/flight-takeoff'
import LocationIcon from 'material-ui/svg-icons/maps/place'
import UrlIcon from 'material-ui/svg-icons/content/link'
import IconButton from 'material-ui/IconButton'
import EditButton from 'material-ui/svg-icons/image/edit'
import DeleteButton from 'material-ui/svg-icons/action/delete'
import * as colors from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

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
    this.handleCloseDetails = this.handleCloseDetails.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    this.handleCloseDelete = this.handleCloseDelete.bind(this)
  }

  handleSelectEvent(event) {
    this.setState({
      event,
    })
  }

  handleCloseDetails() {
    this.setState({
      event: {},
    })
  }

  handleDelete() {
    this.setState({
      openDelete: true,
    })
  }

  handleConfirmDelete() {
    this.props.deleteEvent(this.state.event.id)
    this.handleCloseDelete()
    this.handleCloseDetails()
  }

  handleCloseDelete() {
    this.setState({
      openDelete: false,
    })
  }

  render() {
    const {events} = this.props
    const {event} = this.state

    const detailsActions = [
      <IconButton containerElement={<Link to={{pathname: routes.EVENTS_EDIT.replace(':id', event.id), state: event}} />}>
        <EditButton color={colors.grey600} />
      </IconButton>,
      <IconButton onTouchTap={this.handleDelete}>
        <DeleteButton color={colors.red400} />
      </IconButton>,
    ]

    const deleteActions = [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCloseDelete}
      />,
      <FlatButton
        label={<FormattedMessage id="delete" />}
        primary={true}
        onTouchTap={this.handleConfirmDelete}
      />,
    ]

    const messages = {
      allDay: <FormattedMessage id="calendar.allDay" />,
      previous: <FormattedMessage id="calendar.previous" />,
      next: <FormattedMessage id="calendar.next" />,
      today: <FormattedMessage id="calendar.today" />,
      month: <FormattedMessage id="calendar.month" />,
      week: <FormattedMessage id="calendar.week" />,
      day: <FormattedMessage id="calendar.day" />,
      agenda: <FormattedMessage id="calendar.agenda" />,
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
          onRequestClose={this.handleCloseDetails}
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

        <Dialog title={<FormattedMessage id="delete_title" values={{type: 'event'}} />}
          actions={deleteActions}
          open={this.state.openDelete}
          onRequestClose={this.handleCloseDelete}
        >
          <FormattedMessage id="delete_body" values={{type: 'event', name: event.name}} />
        </Dialog>

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

export default connect(mapStateToProps, mapDispatchToProps)(Events)
