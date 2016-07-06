import md5 from 'md5'

import {auth, db} from '../firebase'
import {rand} from '../utils/utils'

export default (tribe, values/*, dispatch*/) => {
  return new Promise((resolve, reject) => {
    auth.createUserWithEmailAndPassword(values.email, values.password)
    .then((user) => {
      const uid = user.uid
      const gravatar = md5(uid)
      const updates = {}

      const user_record = {
        current_tribe: values.tribe,
        email: values.email,
        gravatar,
        lang: values.lang,
        name: values.name,
        tribes: {
          [values.tribe]: tribe,
        },
      }
      if (values.birthdate) {
        user_record.birthdate = values.birthdate
      }
      if (values.phone) {
        user_record.phone = values.phone
      }
      updates['users/' + uid] = user_record

      // membership
      updates['tribes/' + values.tribe + '/members/' + uid] = {
        balance: 0,
        gravatar,
        name: values.name,
        invite: values.token,
      }

      // private user infos
      updates['users_private/' + uid] = {
        bot_token: rand(32),
      }

      db.ref().update(updates)
      .then(() => {
        // add history entry
        return db.ref('tribes/' + values.tribe + '/history').push({
          action: 'new',
          type: 'member',
          added: Date.now(),
          user: auth.currentUser.uid,
        })
      })
      .then(() => {
        // remove invitation
        return db.ref('tribes/' + values.tribe + '/invites/' + values.token).remove()
      })
      .then(resolve)
      .catch(() => {
        //TODO: prevent logging in
        reject({_error: 'request'})
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
          // console.error('register error:', error.code)
      }
    })
  })
}
