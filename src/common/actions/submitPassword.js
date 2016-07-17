import {auth} from '../firebase'

import {PASSWORD_SUCCESS} from '../constants/actions'
import {firebaseError} from './error'

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
          dispatch(firebaseError(error, 'submitPassword'))
      }
    })
  })
}
