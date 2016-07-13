import {auth} from '../firebase'

import {PASSWORD_SUCCESS, FIREBASE_FAILURE} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(values.email)
    .then(() => {
      resolve()
      dispatch({
        type: PASSWORD_SUCCESS,
      })
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          reject({email: 'unknown'})
          break
        default:
          reject({_error: 'request'})
          dispatch({
            type: FIREBASE_FAILURE,
            origin: 'submitPassword',
            error,
          })
      }
    })
  })
}
