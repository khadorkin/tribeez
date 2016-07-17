import {db, auth, timestamp} from '../firebase'
import fcm from '../fcm'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  USER_UPDATED,
  TRIBE_UPDATED,
  MEMBER_ADDED,
  MEMBER_UPDATED,
  MEMBERS_REMOVED,
} from '../constants/actions'

import {firebaseError} from './error'

let privateRef
let userRef
let memberRef
let tribeRef

const on = (uid) => {
  return (dispatch, getState) => {
    // Firebase Cloud Messaging:
    fcm.requestPermissions()

    const onToken = (token) => {
      const userTokens = getState().user.fcm_tokens
      if (!userTokens || !userTokens[token]) {
        privateRef.child('fcm_tokens').child(token).set(timestamp)
        .catch((error) => {
          dispatch(firebaseError(error, 'getMember/fcm_tokens'))
        })
      }
    }

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

      fcm.subscribeToken(onToken)
    }, (error) => {
      dispatch(firebaseError(error, 'getMember/users_private'))
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
        dispatch(firebaseError(error, 'getMember/tribe_infos'))
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
        dispatch(firebaseError(error, 'getMember/tribe_members/added'))
      })

      memberRef.on('child_changed', (sub_snapshot) => {
        const member = sub_snapshot.val()
        member.uid = sub_snapshot.key
        dispatch({
          type: MEMBER_UPDATED,
          member,
        })
      }, (error) => {
        dispatch(firebaseError(error, 'getMember/tribe_members/changed'))
      })
    }, (error) => {
      dispatch(firebaseError(error, 'getMember/user'))
    })
  }
}

const off = () => {
  return (dispatch) => {
    privateRef.off()
    userRef.off()
    if (tribeRef) {
      tribeRef.off()
      memberRef.off()
    }
    dispatch({
      type: MEMBERS_REMOVED,
    })
    fcm.unsubscribeToken()
  }
}

export default {on, off}
