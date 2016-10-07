import {SubmissionError} from 'redux-form'

import {auth} from '../firebase'

import {PASSWORD_SUCCESS, ALERT} from '../constants/actions'
import failure from './failure'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(values.email)
    .then(() => {
      resolve()
      dispatch({
        type: PASSWORD_SUCCESS, // Web
      })
      dispatch({
        type: ALERT, // Mobile // TODO: make for Web
        options: {
          title_id: 'dialog_reset_title',
          text_id: 'dialog_reset_text',
          buttons: [
            {text_id: 'ok'},
          ],
        },
      })
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          reject(new SubmissionError({email: 'unknown'}))
          break
        case 'auth/network-request-failed':
          reject(new SubmissionError({_error: 'network'}))
          break
        default:
          reject(new SubmissionError({_error: 'request'}))
          dispatch(failure(error, 'submitPassword'))
      }
    })
  })
}
