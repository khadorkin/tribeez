import {SubmissionError} from 'redux-form'
import md5 from 'md5'
import firebase from 'firebase'

import {auth, db} from '../firebase'

import {SNACK_MESSAGE} from '../constants/actions'

import failure from './failure'

export default (reauth_prompt, tribe_ids, values, dispatch) => {
  const checkReAuth = (error) => {
    if (error.code === 'auth/requires-recent-login') {
      const password = prompt(reauth_prompt) //TODO: mobile version
      const credential = firebase.auth.EmailAuthProvider.credential(auth.currentUser.email, password)
      return auth.currentUser.reauthenticate(credential)
    } else {
      throw error
    }
  }

  return new Promise((resolve, reject) => {
    const gravatar = md5(values.email)
    auth.currentUser.updateEmail(values.email)
    .catch(checkReAuth)
    .then(() => {
      return db.ref('users/' + auth.currentUser.uid).transaction((user) => {
        if (user) {
          user.name = values.name
          user.lang = values.lang
          user.email = values.email
          user.gravatar = gravatar
          user.birthdate = values.birthdate || null
          user.phone = values.phone || null
        }
        return user
      })
    })
    .then(() => {
      auth.currentUser.name = values.name

      return Promise.all(tribe_ids.map((tid) => {
        return db.ref('tribes/' + tid + '/members/' + auth.currentUser.uid).transaction((member) => {
          if (member) {
            member.name = values.name
            member.gravatar = gravatar
          }
          return member
        })
      }))
    })
    .then(() => {
      if (values.password) {
        return auth.currentUser.updatePassword(values.password)
        .catch(checkReAuth)
      }
      return true
    })
    .then(() => {
      resolve()
      dispatch({
        type: SNACK_MESSAGE,
        message: 'profile_updated',
      })
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/email-already-in-use':
          reject(new SubmissionError({email: 'exists'}))
          break
        case 'auth/invalid-email':
          reject(new SubmissionError({email: 'invalid'}))
          break
        case 'auth/weak-password':
          reject(new SubmissionError({password: 'weak'}))
          break
        // from reauthenticate:
        case 'auth/wrong-password':
        case 'auth/argument-error':
          reject(new SubmissionError({_error: 'reauth'}))
          break
        case 'auth/network-request-failed':
          reject(new SubmissionError({_error: 'network'}))
          break
        default:
          reject(new SubmissionError({_error: 'request'}))
          dispatch(failure(error, 'submitProfile'))
      }
    })
  })
}
