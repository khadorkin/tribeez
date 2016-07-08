import {db, auth} from '../firebase'

import {
  SNACK_MESSAGE,
  FIREBASE_FAILURE,
  UNREAD,
} from '../constants/actions'

let historyRef
let lastKeyRef

const on = (tid) => {
  return (dispatch) => {
    historyRef = db.ref('tribes/' + tid + '/history')
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
      historyRef.off('child_added', onLastEntry)
      historyRef.orderByKey().startAt(snapshot.key).on('child_added', onNewEntry, onError)
    }

    historyRef.orderByKey().limitToLast(1).on('child_added', onLastEntry, onError)

    const onCount = (snapshot) => {
      dispatch({
        type: UNREAD,
        count: snapshot.numChildren() - 1, // exclude the last seen one
      })
    }

    const onLastKey = (snapshot) => {
      const lastKey = snapshot.val()
      historyRef.off('value')
      if (lastKey) {
        historyRef.orderByKey().startAt(lastKey).on('value', onCount)
      } else {
        historyRef.orderByKey().on('value', onCount) //TODO: start at registration date
      }
    }

    lastKeyRef = db.ref('tribes/' + tid + '/members/' + auth.currentUser.uid + '/last_viewed_history_key')
    lastKeyRef.on('value', onLastKey)
  }
}

const off = () => {
  return () => {
    if (historyRef) {
      historyRef.off()
    }
    if (lastKeyRef) {
      lastKeyRef.off()
    }
  }
}

export default {on, off}
