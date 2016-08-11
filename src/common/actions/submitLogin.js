import {auth} from '../firebase'
import {login} from './auth'
import report from './error'

export default (destination, values, dispatch) => {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(values.email, values.password)
    .then((user) => {
      resolve()
      dispatch(login(user))
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
          dispatch(report(error, 'submitLogin'))
      }
    })
  })
}
