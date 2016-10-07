import {SubmissionError} from 'redux-form'

import {auth} from '../firebase'
import {login} from './auth'
import failure from './failure'

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
          reject(new SubmissionError({email: 'unknown'}))
          break
        case 'auth/wrong-password':
          reject(new SubmissionError({password: 'wrong'}))
          break
        case 'auth/network-request-failed':
          reject(new SubmissionError({_error: 'network'}))
          break
        default:
          reject(new SubmissionError({_error: 'request'}))
          dispatch(failure(error, 'submitLogin'))
      }
    })
  })
}
