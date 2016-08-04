import {db, auth, timestamp} from '../firebase'
import fcm from '../fcm'

import {FIREBASE_REQUEST, USER_UPDATED} from '../constants/actions'

import {firebaseError} from './error'

import listenTribe from './listenTribe'

let publicRef
let privateRef

const on = (uid) => {
  return (dispatch, getState) => {
    // Firebase Cloud Messaging:
    fcm.requestPermissions()

    const onToken = (token) => {
      const userTokens = getState().user.fcm_tokens
      if (!userTokens || !userTokens[token]) {
        privateRef.child('fcm_tokens').child(token).set(timestamp)
        .catch((error) => {
          dispatch(firebaseError(error, 'listenUser/fcm_tokens'))
        })
      }
    }

    dispatch({
      type: FIREBASE_REQUEST, // FIREBASE_SUCCESS is handled in listenTribe.on
    })

    publicRef = db.ref('users/' + uid)

    publicRef.on('value', (snapshot) => {
      const user = snapshot.val()
      const tid = user.current_tribe

      auth.currentUser.name = user.name
      auth.currentUser.gravatar = user.gravatar

      dispatch({
        type: USER_UPDATED,
        user,
      })

      if (auth.currentUser.tid !== tid) {
        dispatch(listenTribe.off())
        dispatch(listenTribe.on(tid))
      }
    }, (error) => {
      dispatch(firebaseError(error, 'listenUser/user'))
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
      dispatch(firebaseError(error, 'listenUser/users_private'))
    })
  }
}

const off = () => {
  return (dispatch) => {
    publicRef.off()
    privateRef.off()
    dispatch(listenTribe.off())
    fcm.unsubscribeToken()
  }
}

export default {on, off}
