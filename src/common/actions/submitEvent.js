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
    // this key is used to separate past/upcoming events:
    values.index = values.end || values.start

    db.ref('tribes/' + tid + '/events/' + id).set(values)
    .then(() => {
      return db.ref('tribes/' + tid + '/history').push({
        type: 'event',
        action,
        added: timestamp,
        user: auth.currentUser.uid,
        item: values,
        id,
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
