import {auth} from '../firebase'

import {
  FIREBASE_FAILURE,
  API_FAILURE,
} from '../constants/actions'

const reportError = (type, error, origin) => {
  if (__DEV__) {
    /*eslint-disable no-console*/
    console.error(type, 'error from', origin + ':', error)
    /*eslint-enable no-console*/
  }
  const errorStr = (error.code || error.message || error.toString()) //TODO: improve
  if (window.Rollbar) {
    const extra = {
      origin,
    }
    if (auth.currentUser) {
      extra.user = auth.currentUser.uid
      extra.tribe = auth.currentUser.tid
    }
    Rollbar.error(type + ': ' + errorStr, extra)
  }
  return errorStr
}

export const apiError = (error, origin) => {
  return (dispatch) => {
    dispatch({
      type: API_FAILURE,
      error: reportError('api', error, origin),
    })
  }
}

export const firebaseError = (error, origin) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_FAILURE,
      error: reportError('firebase', error, origin),
    })
  }
}
