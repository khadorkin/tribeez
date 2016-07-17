import md5 from 'md5'
import firebase from 'firebase'

import {auth, db} from '../firebase'

import {SNACK_MESSAGE} from '../constants/actions'

import {firebaseError} from './error'

export default (reauth_prompt, values, dispatch) => {
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
        user.name = values.name
        user.lang = values.lang
        user.email = values.email
        user.gravatar = gravatar
        user.birthdate = values.birthdate || null
        user.phone = values.phone || null
        return user
      })
    })
    .then(() => {
      auth.currentUser.name = values.name
      return db.ref('tribes/' + auth.currentUser.tid + '/members/' + auth.currentUser.uid).transaction((member) => {
        member.name = values.name
        member.gravatar = gravatar
      })
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
          reject({email: 'exists'})
          break
        case 'auth/invalid-email':
          reject({email: 'invalid'})
          break
        case 'auth/weak-password':
          reject({password: 'weak'})
          break
        // from reauthenticate:
        case 'auth/wrong-password':
        case 'auth/argument-error':
          reject({_error: 'reauth'})
          break
        default:
          reject({_error: 'request'})
          dispatch(firebaseError(error, 'submitProfile'))
      }
    })
  })
}
