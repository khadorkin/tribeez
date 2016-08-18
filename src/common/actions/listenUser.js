import {db, auth, timestamp} from '../firebase'
import fcm from '../fcm'

import {REQUEST, USER_UPDATED} from '../constants/actions'

import {setAttr, setUser, clearUser} from '../error-report'
import report from './error'

import listenTribe from './listenTribe'

import {android} from '../config'

let publicRef
let privateRef

const on = (uid) => {
  return (dispatch, getState) => {
    // Firebase Cloud Messaging:
    fcm.requestPermissions()

    const onToken = (token) => {
      const userTokens = getState().user.fcm_tokens
      if (!userTokens || !userTokens[token]) {
        privateRef.child('fcm_tokens').child(token).set({
          timestamp,
          model: android.model,
          appVersion: android.appVersion,
          systemName: android.systemName,
          systemVersion: android.systemVersion,
          manufacturer: android.systemManufacturer,
          locale: android.deviceLocale,
          timezone: android.timezone,
        })
        .catch((error) => {
          dispatch(report(error, 'listenUser/fcm_tokens'))
        })
      }
    }

    dispatch({
      type: REQUEST, // SUCCESS is handled in listenTribe.on
    })

    publicRef = db.ref('users/' + uid)

    publicRef.on('value', (snapshot) => {
      const user = snapshot.val()
      const tid = user.current_tribe
      setUser(uid, user)
      setAttr('tribe', tid)

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
      dispatch(report(error, 'listenUser/user'))
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
      dispatch(report(error, 'listenUser/users_private'))
    })
  }
}

const off = () => {
  return (dispatch) => {
    publicRef.off()
    privateRef.off()
    dispatch(listenTribe.off())
    fcm.unsubscribeToken()
    clearUser()
  }
}

export default {on, off}
