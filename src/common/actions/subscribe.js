import {db} from '../firebase'

import {
  SNACK_MESSAGE,
  FIREBASE_FAILURE,
} from '../constants/actions'

export default (tid) => {
  return (dispatch) => {
    const route = 'tribes/' + tid + '/history'
    const firstRef = db.ref(route)
    let isNew = false

    const onError = (error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'subscribe',
        error,
      })
    }

    const onNewEntry = (snapshot) => {
      if (isNew) {
        const entry = snapshot.val()
        dispatch({
          type: SNACK_MESSAGE,
          message: entry.action + '_' + entry.type,
          author: entry.user,
          name: entry.item.name,
        })
      }
      isNew = true
    }

    const onLastEntry = (snapshot) => {
      firstRef.off('child_added', onLastEntry)
      db.ref(route).orderByKey().startAt(snapshot.key).on('child_added', onNewEntry, onError)
    }

    firstRef.orderByKey().limitToLast(1).on('child_added', onLastEntry, onError)
  }
}
