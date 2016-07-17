import {db, auth, timestamp} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
} from '../constants/actions'

import {firebaseError} from './error'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/tasks/' + id).transaction((task) => {
      task.counters[auth.currentUser.uid]++
      task.done = timestamp
      return task
    })
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(firebaseError(error, 'postDone'))
    })
  }
}
