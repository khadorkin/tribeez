import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

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

import styles from '../styles'
import routes from '../routes'

import {db} from '../../common/firebase'
import {getTimestamp} from '../../common/utils/utils'

import deleteItem from '../../common/actions/deleteItem'
import newEvent from '../../common/actions/newEvent'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
)
const startAccessor = (event) => new Date(event.start)
const endAccessor = (event) => {
  const end = event.end ? new Date(event.end) : new Date(event.start)
  if (end.getHours() === 0) {
    end.setHours(12) // hack for BigCalendar to include the last day
  }
  return end
}

const eventPropGetter = (/*event, start, end, isSelected*/) => ({style: {backgroundColor: colors.deepOrange300}})

const infos = [
  {id: 'description', icon: <DescIcon />},
  {id: 'start', icon: <StartIcon />, date: true},
  {id: 'end', icon: <EndIcon />, date: true},
  {id: 'location', icon: <LocationIcon />, map: true},
  {id: 'url', icon: <UrlIcon />, link: true},
]

class Events extends Component {
  static propTypes = {
    // redux state:
    tid: PropTypes.string,
    lang: PropTypes.string.isRequired,
    // action creators:
    deleteItem: PropTypes.func.isRequired,
    newEvent: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      events: [],
      event: {},
      openDelete: false,
      error: null,
    }
    this.load = this.load.bind(this)
    this.valueChanged = this.valueChanged.bind(this)
    this.handleError = this.handleError.bind(this)
    this.handleSelectEvent = this.handleSelectEvent.bind(this)
    this.handleCloseDetails = this.handleCloseDetails.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    this.handleCloseDelete = this.handleCloseDelete.bind(this)
    this.handleSelectSlot = this.handleSelectSlot.bind(this)
  }

  componentDidMount() {
    if (this.props.tid) {
      this.load(this.props.tid)
    }
  }

  componentWillReceiveProps(props) {
    if (props.tid) {
      this.load(props.tid)
    }
  }

  componentWillUnmount() {
    if (this.query) {
      this.query.off('value')
    }
  }

  load(tid) {
    if (!this.listening) {
      this.query = db.ref('tribes/' + tid + '/events')
      this.query.on('value', this.valueChanged, this.handleError)
      this.listening = true
    }
  }

  valueChanged(snapshot) {
    const values = snapshot.val()
    const events = []
    for (const id in values) {
      const event = values[id]
      event.id = id
      events.push(event)
    }
    this.setState({
      events,
    })
  }

  handleError(error) {
    this.setState({
      error: 'firebase.error.' + error.code,
    })
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
    this.props.deleteItem('event', this.state.event.id)
    this.handleCloseDelete()
    this.handleCloseDetails()
  }

  handleCloseDelete() {
    this.setState({
      openDelete: false,
    })
  }

  handleSelectSlot(event) {
    this.props.newEvent(event)
  }

  render() {
    const {events, event, error} = this.state

    if (error) {
      return (
        <div style={styles.errorContainer}>
          <div style={styles.errorText}>
            <FormattedMessage id={error} />
          </div>
        </div>
      )
    }

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
      <div>
        <BigCalendar
          style={{height: '550px', backgroundColor: 'white', padding: 16}}
          events={events}
          popup={true}
          views={views}
          culture={this.props.lang}
          titleAccessor="name"
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          onSelectEvent={this.handleSelectEvent}
          messages={messages}
          eventPropGetter={eventPropGetter}
          selectable={true}
          onSelectSlot={this.handleSelectSlot}
        />

        <Dialog title={event.name}
          actions={detailsActions}
          open={Boolean(event.id)}
          onRequestClose={this.handleCloseDetails}
        >
          <List>
            {
              infos
                .filter((info) => event[info.id]) // remove undefined infos
                .map((info) => {
                  let value = event[info.id]
                  if (info.date) {
                    const suffix = (typeof value === 'string') ? '' : 'time'
                    value = <FormattedMessage id={'date' + suffix} values={{date: getTimestamp(value)}} />
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

        <Dialog title={event.name}
          actions={deleteActions}
          open={this.state.openDelete}
          onRequestClose={this.handleCloseDelete}
        >
          <FormattedMessage id="delete_dialog" values={{type: 'event'}} />
        </Dialog>

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.EVENTS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tid: state.tribe.id,
  lang: state.app.lang,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteItem,
  newEvent,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Events)
