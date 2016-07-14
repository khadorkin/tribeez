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
    let lastKey

    const onError = (error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'subscribe',
        error,
      })
    }

    const countUnread = () => {
      db.ref('tribes/' + tid + '/history').orderByKey().startAt(lastKey).once('value').then((snapshot) => {
        const entries = snapshot.val()
        let count = 0
        let first = true
        for (const key in entries) {
          if (first) {
            first = false
            continue // exclude the last seen one
          }
          if (entries[key].user !== auth.currentUser.uid) {
            count++
          }
        }
        dispatch({
          type: UNREAD,
          count,
        })
      })
    }

    const onNewEntry = (snapshot) => {
      if (isNew) {
        const entry = snapshot.val()
        dispatch({
          type: SNACK_MESSAGE,
          message: entry.action + '_' + entry.type,
          author: entry.author,
          name: entry.item.name,
          id: snapshot.key,
        })
        countUnread()
      }
      isNew = true
    }

    const onLastEntry = (snapshot) => {
      historyRef.off('child_added', onLastEntry)
      db.ref('tribes/' + tid + '/history').orderByKey().startAt(snapshot.key).on('child_added', onNewEntry, onError)
    }

    db.ref('tribes/' + tid + '/history').orderByKey().limitToLast(1).on('child_added', onLastEntry, onError)

    lastKeyRef = db.ref('tribes/' + tid + '/members/' + auth.currentUser.uid + '/last_viewed_history_key')
    lastKeyRef.on('value', (snapshot) => {
      lastKey = snapshot.val()
      countUnread()
    })
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
