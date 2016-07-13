import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  USER_UPDATED,
  TRIBE_UPDATED,
  MEMBER_ADDED,
  MEMBER_UPDATED,
  MEMBERS_REMOVED,
} from '../constants/actions'

const origin = 'getMember'
let privateRef
let userRef
let memberRef
let tribeRef

const on = (uid) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    privateRef = db.ref('users_private/' + uid)

    privateRef.on('value', (snapshot) => {
      const user = snapshot.val()

      dispatch({
        type: USER_UPDATED,
        user,
      })
    }, (error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin,
        error: error.code,
      })
    })

    userRef = db.ref('users/' + uid)

    userRef.on('value', (snapshot) => {
      const user = snapshot.val()
      auth.currentUser.name = user.name
      auth.currentUser.gravatar = user.gravatar
      auth.currentUser.tid = user.current_tribe

      dispatch({
        type: USER_UPDATED,
        user,
      })

      tribeRef = db.ref('tribes/' + user.current_tribe + '/infos')

      tribeRef.on('value', (sub_snapshot) => {
        const tribe = sub_snapshot.val()
        tribe.id = user.current_tribe
        auth.currentUser.tribe = tribe.name

        dispatch({
          type: TRIBE_UPDATED,
          tribe,
        })
        dispatch({
          type: FIREBASE_SUCCESS,
        })
      }, (error) => {
        dispatch({
          type: FIREBASE_FAILURE,
          origin,
          error: error.code,
        })
      })

      memberRef = db.ref('tribes/' + user.current_tribe + '/members')

      memberRef.on('child_added', (sub_snapshot) => {
        const member = sub_snapshot.val()
        member.uid = sub_snapshot.key
        dispatch({
          type: MEMBER_ADDED,
          member,
        })
      }, (error) => {
        dispatch({
          type: FIREBASE_FAILURE,
          origin,
          error: error.code,
        })
      })

      memberRef.on('child_changed', (sub_snapshot) => {
        const member = sub_snapshot.val()
        member.uid = sub_snapshot.key
        dispatch({
          type: MEMBER_UPDATED,
          member,
        })
      }, (error) => {
        dispatch({
          type: FIREBASE_FAILURE,
          origin,
          error: error.code,
        })
      })
    }, (error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin,
        error: error.code,
      })
    })
  }
}

const off = () => {
  return (dispatch) => {
    privateRef.off()
    userRef.off()
    memberRef.off()
    tribeRef.off()
    dispatch({
      type: MEMBERS_REMOVED,
    })
  }
}

export default {on, off}
