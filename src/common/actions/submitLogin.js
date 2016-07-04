import router from '../router'
import routes from '../routes'

import firebase from 'firebase'

import {LOGIN} from '../constants/actions'

export default (destination, values, dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then((user) => {
      resolve()
      dispatch({
        type: LOGIN,
        user,
      })
      router.resetTo(destination || routes.ACTIVITY, dispatch)
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          reject({email: 'unknown'})
          break
        case 'auth/wrong-password':
          reject({password: 'wrong'})
          break
        default:
          reject({_error: 'request'})
          // console.error('auth error:', error.code)
      }
    })
  })
}
