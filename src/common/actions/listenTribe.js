import {db, auth} from '../firebase'

import {
  TRIBE_UPDATED,
  MEMBER_ADDED,
  MEMBER_UPDATED,
  SNACK_MESSAGE,
  UNREAD,
  MEMBERS_REMOVED,
} from '../constants/actions'

import {firebaseError} from './error'

let tribeRef
let memberRef
let historyRef
let lastKeyRef

const on = (tid) => {
  return (dispatch) => {
    tribeRef = db.ref('tribes/' + tid + '/infos')

    tribeRef.on('value', (sub_snapshot) => {
      const tribe = sub_snapshot.val()
      tribe.id = tid
      auth.currentUser.tribe = tribe.name

      dispatch({
        type: TRIBE_UPDATED,
        tribe,
      })
      // dispatch({
      //   type: FIREBASE_SUCCESS,
      // })
    }, (error) => {
      dispatch(firebaseError(error, 'listenUser/tribe_infos'))
    })

    memberRef = db.ref('tribes/' + tid + '/members')

    memberRef.on('child_added', (sub_snapshot) => {
      const member = sub_snapshot.val()
      member.uid = sub_snapshot.key
      dispatch({
        type: MEMBER_ADDED,
        member,
      })
    }, (error) => {
      dispatch(firebaseError(error, 'listenUser/tribe_members/added'))
    })

    memberRef.on('child_changed', (sub_snapshot) => {
      const member = sub_snapshot.val()
      member.uid = sub_snapshot.key
      dispatch({
        type: MEMBER_UPDATED,
        member,
      })
    }, (error) => {
      dispatch(firebaseError(error, 'listenUser/tribe_members/changed'))
    })

    historyRef = db.ref('tribes/' + tid + '/history')
    let isNew = false
    let lastKey

    const onError = (error) => {
      dispatch(firebaseError(error, 'listenTribe'))
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
          if (entries[key].author !== auth.currentUser.uid) {
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
          name: entry.item && entry.item.name,
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
  return (dispatch) => {
    if (tribeRef) {
      tribeRef.off()
      tribeRef = null
    }
    if (memberRef) {
      memberRef.off()
      memberRef = null
    }
    if (historyRef) {
      historyRef.off()
      historyRef = null
    }
    if (lastKeyRef) {
      lastKeyRef.off()
      lastKeyRef = null
    }
    dispatch({
      type: MEMBERS_REMOVED,
    })
  }
}

export default {on, off}
