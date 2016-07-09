import md5 from 'md5'

import {auth, db} from '../firebase'

import {
  FIREBASE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const gravatar = md5(values.email)
    auth.currentUser.updateEmail(values.email).then(() => {
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
        default:
          reject({_error: 'request'})
          dispatch({
            type: FIREBASE_FAILURE,
            origin: 'submitProfile',
            error,
          })
      }
    })
  })
}
