import {auth} from '../firebase'

import {
  FAILURE,
} from '../constants/actions'

export default (error, origin, type = 'firebase') => {
  return (dispatch) => {
    if (__DEV__) {
      /*eslint-disable no-console*/
      console.error(type + ' error from ' + origin + ':', error)
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
    dispatch({
      type: FAILURE,
      error: errorStr,
    })
  }
}
