import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'

import {FIREBASE_FAILURE} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    values.options = values.options.filter((option) => option)
    if (values.options.length < 2) {
      reject({_error: 'no_options'})
      return
    }

    const tid = auth.currentUser.tid
    let id = values.id
    delete values.id
    let action
    if (id) {
      action = 'update'
    } else {
      action = 'new'
      values.added = timestamp
      id = db.ref('tribes/' + tid + '/polls').push().key
    }

    db.ref('tribes/' + tid + '/polls/' + id).transaction((poll) => {
      // delete existing answers since the options might have changed:
      if (poll) {
        delete poll.answers
      }
      return {...poll, ...values} // to keep the log
    })
    .then(() => {
      values.id = id
      return db.ref('tribes/' + tid + '/history').push({
        type: 'poll',
        action,
        time: timestamp,
        author: auth.currentUser.uid,
        item: values,
      })
    })
    .then(() => {
      return db.ref('tribes/' + tid + '/polls/' + id + '/log').push({
        action,
        time: timestamp,
        author: auth.currentUser.uid,
        item: values,
      })
    })
    .then(() => {
      resolve()
      router.resetTo(routes.POLLS, dispatch)
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'submitPoll',
        error,
      })
      reject({_error: 'request'})
    })
  })
}
