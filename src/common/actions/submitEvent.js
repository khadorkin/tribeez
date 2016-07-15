import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'

import {FIREBASE_FAILURE} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const tid = auth.currentUser.tid
    let id = values.id
    delete values.id
    let action
    if (id) {
      action = 'update'
    } else {
      action = 'new'
      values.added = timestamp
      id = db.ref('tribes/' + tid + '/events').push().key
    }

    // the index is used to split between past and upcoming events:
    if (values.end) {
      values.index = values.end
    } else {
      const start = new Date(values.start)
      if (start.getHours() !== 0 || start.getMinutes() !== 0) {
        values.index = values.start + 3600 * 1000 // default duration = 1 hour
      } else {
        values.index = values.start + 86400 * 1000 // default duration = 1 day
      }
    }

    db.ref('tribes/' + tid + '/events/' + id).transaction((event) => {
      return {...event, ...values} // to keep the log
    })
    .then(() => {
      values.id = id
      return db.ref('tribes/' + tid + '/history').push({
        type: 'event',
        action,
        time: timestamp,
        author: auth.currentUser.uid,
        item: values,
      })
    })
    .then(() => {
      return db.ref('tribes/' + tid + '/events/' + id + '/log').push({
        action,
        time: timestamp,
        author: auth.currentUser.uid,
        item: values,
      })
    })
    .then(() => {
      resolve()
      router.resetTo(routes.EVENTS, dispatch)
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'submitEvent',
        error,
      })
      reject({_error: 'request'})
    })
  })
}
