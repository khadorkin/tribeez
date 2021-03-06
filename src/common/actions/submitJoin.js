import {SubmissionError} from 'redux-form'
import md5 from 'md5'

import {auth, db, timestamp} from '../firebase'
import {rand} from '../utils/text'
import {login} from './auth'

import {SNACK_MESSAGE} from '../constants/actions'

import failure from './failure'

export default (invite, values, dispatch) => {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(values.email, values.password)
    .then((user) => {
      const uid = user.uid
      const gravatar = md5(user.email)
      const tid = invite.tribe
      const historyKey = db.ref('tribes/' + tid + '/history').push().key
      const updates = {}

      let errorOrigin = 'updates'

      // user infos
      updates['users/' + uid] = {
        current_tribe: tid,
        email: user.email,
        gravatar,
        lang: values.lang,
        name: values.name,
        registered: timestamp,
        tribes: {
          [tid]: invite.tribe_name,
        },
        // birthdate: values.birthdate || null,
        // phone: values.phone || null,
      }

      // private user infos
      updates['users_private/' + uid] = {
        bot_token: rand(32),
      }

      // membership
      updates['tribes/' + tid + '/members/' + uid] = {
        balance: 0,
        gravatar,
        name: values.name,
        joined: timestamp,
        last_viewed_history_key: historyKey,
        invite: values.token, // for security rules
      }

      // notification
      updates['notifications/join/' + uid] = tid

      db.ref().update(updates)
      .then(() => {
        errorOrigin = 'history'
        // add history entry
        return db.ref('tribes/' + tid + '/history/' + historyKey).set({
          action: 'new',
          type: 'member',
          time: timestamp,
          author: uid,
          inviter: invite.inviter,
        })
      })
      .then(() => {
        errorOrigin = 'removeInvite'
        // remove invitation
        return db.ref('tribes/' + tid + '/invites/' + values.token).remove()
      })
      .catch((error) => {
        // rollback user creation:
        db.ref().update({
          ['tribes/' + tid + '/members/' + uid]: null,
          ['users/' + uid]: null,
          ['users_private/' + uid]: null,
        })
        .then(() => {
          return Promise.all([
            user.delete(),
            auth.signOut(),
          ])
        })
        .catch(() => {
          dispatch(failure(error, 'submitJoin/rollback'))
        })
        dispatch(failure(error, 'submitJoin/' + errorOrigin))
        return Promise.reject()
      })
      .then(() => {
        resolve()
        dispatch(login(user))
        dispatch({
          type: SNACK_MESSAGE,
          message: 'joined',
          name: invite.tribe_name,
        })
      })
      .catch(() => { // either from a firebase fail or from a login dispatch fail
        reject(new SubmissionError({_error: 'request'}))
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
        case 'auth/network-request-failed':
          reject(new SubmissionError({_error: 'network'}))
          break
        default:
          reject(new SubmissionError({_error: 'request'}))
          dispatch(failure(error, 'submitJoin/createUser'))
      }
    })
  })
}
