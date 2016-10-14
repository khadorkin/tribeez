import {db, auth, timestamp} from '../firebase'
import fcm from '../fcm'

import {REQUEST, USER_UPDATED} from '../constants/actions'

import report from '../report'
import failure from './failure'

import listenTribe from './listenTribe'

import {deviceInfo} from '../config'

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
          model: deviceInfo.model,
          appVersion: deviceInfo.appVersion,
          systemName: deviceInfo.systemName,
          systemVersion: deviceInfo.systemVersion,
          manufacturer: deviceInfo.systemManufacturer,
          locale: deviceInfo.deviceLocale,
          timezone: deviceInfo.timezone,
        })
        .catch((error) => {
          dispatch(failure(error, 'listenUser/fcm_tokens'))
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
      report.setUser(uid, user, tid)

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
      dispatch(failure(error, 'listenUser/user'))
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
      dispatch(failure(error, 'listenUser/users_private'))
    })
  }
}

const off = () => {
  return (dispatch) => {
    publicRef.off()
    privateRef.off()
    dispatch(listenTribe.off())
    fcm.unsubscribeToken()
    report.clearUser()
  }
}

export default {on, off}
