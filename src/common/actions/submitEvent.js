import {SubmissionError} from 'redux-form'

import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'

import saveLog from './saveLog'
import failure from './failure'
import {reminderTimeId, storedTime} from '../utils/time'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const event = {
      name: values.name,
      description: values.description,
      start: values.start,
      end: values.end,
      location: values.location,
      url: values.url,
      reminder: values.reminder,
      added: values.added || timestamp,
      author: values.author,
    }

    const tid = auth.currentUser.tid
    let id = values.id
    let action
    let current
    if (id) {
      action = 'update'
    } else {
      action = 'new'
      id = db.ref('tribes/' + tid + '/events').push().key
    }

    // the index is used to split between past and upcoming events:
    if (event.end) {
      event.index = event.end
    } else {
      const start = new Date(event.start)
      if (start.getHours() === 0 && start.getMinutes() === 0) {
        event.index = event.start + 86400 * 1000 // default duration = 1 day
      } else {
        event.index = event.start + 3600 * 1000 // default duration = 1 hour
      }
    }

    // store day events as Y-m-d strings instead of timestamps, to avoid timezone issues:
    event.start = storedTime(event.start)
    event.end = storedTime(event.end)

    db.ref('tribes/' + tid + '/events/' + id).transaction((currentEvent) => {
      if (currentEvent) {
        current = currentEvent // stays undefined if new
        event.log = currentEvent.log
      }
      return event
    })
    .then(() => {
      event.id = id
      return saveLog('event', action, event)
    })
    .then(() => {
      if (current && current.reminder !== 'none') {
        return db.ref('reminders/event/' + reminderTimeId(current.start, current.reminder) + '/' + id).remove()
      }
      return null
    })
    .then(() => {
      if (event.reminder !== 'none') {
        return db.ref('reminders/event/' + reminderTimeId(values.start, event.reminder) + '/' + id).set(tid)
      }
      return null
    })
    .then(() => {
      resolve()
      router.resetTo(routes.EVENTS, dispatch)
    })
    .catch((error) => {
      dispatch(failure(error, 'submitEvent'))
      reject(new SubmissionError({_error: 'request'}))
    })
  })
}
