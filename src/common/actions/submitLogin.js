import platform from '../platform'

import asyncStorage from '../utils/asyncStorage'

import {auth} from '../firebase'

export default (destination, values/*, dispatch*/) => {
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(values.email, values.password)
    .then(() => {
      if (platform !== 'web') {
        asyncStorage.setItem('credentials', JSON.stringify(values))
        .then(resolve)
        .catch(() => {
          // console.error('LOCAL STORAGE SET ERROR', error)
        })
      } else {
        resolve()
      }
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
