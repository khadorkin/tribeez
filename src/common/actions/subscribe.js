import {db} from '../firebase'

import {
  SNACK_MESSAGE,
  FIREBASE_FAILURE,
} from '../constants/actions'

let ref

const on = (tid) => {
  return (dispatch) => {
    ref = db.ref('tribes/' + tid + '/history')
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
      ref.off('child_added', onLastEntry)
      ref.orderByKey().startAt(snapshot.key).on('child_added', onNewEntry, onError)
    }

    ref.orderByKey().limitToLast(1).on('child_added', onLastEntry, onError)
  }
}

const off = () => {
  return () => {
    ref.off()
  }
}

export default {on, off}
