import {auth} from '../firebase'
import platform from '../platform'
import asyncStorage from '../utils/asyncStorage'
import {login} from './app'

export default (destination, values, dispatch) => {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(values.email, values.password)
    .then((user) => {
      if (platform !== 'web') {
        asyncStorage.setItem('credentials', JSON.stringify(values))
        .catch(() => {
          // console.error('LOCAL STORAGE SET ERROR', error)
        })
      }
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
          // console.error('auth error:', error.code)
      }
    })
  })
}
