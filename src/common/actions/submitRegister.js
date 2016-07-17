import md5 from 'md5'

import api from '../utils/api'
import {auth, db, timestamp} from '../firebase'
import platform from '../platform'
import {rand} from '../utils/utils'
import {login} from './auth'

import {firebaseError, apiError} from './error'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    let promise
    if (platform === 'web') {
      promise = api.post('register', {captcha: values.captcha})
    } else {
      promise = Promise.resolve({})
    }

    promise.then((response) => {
      if (response.error) {
        reject(response.error)
        return
      }

      auth.createUserWithEmailAndPassword(values.email, values.password)
      .then((user) => {
        const uid = user.uid
        const gravatar = md5(user.email)
        const tid = db.ref('tribes').push().key
        const historyKey = db.ref('tribes/' + tid + '/history').push().key

        let errorOrigin = 'cities'
        db.ref('cities/' + values.city.place_id).transaction((city) => {
          if (!city) {
            city = {
              name: values.city.name,
              country_code: values.city.country_code,
              // place_id is already the key
            }
          }
          if (!city.tribes) {
            city.tribes = {}
          }
          city.tribes[tid] = true
          return city
        })
        .then(() => {
          errorOrigin = 'updates'
          const updates = {}

          updates['tribes/' + tid] = {
            infos: {
              name: values.tribe_name,
              type: values.tribe_type,
              currency: values.currency,
              city: values.city,
              created: timestamp,
            },
            members: {
              [uid]: { // membership
                balance: 0,
                gravatar,
                name: values.name,
                joined: timestamp,
                last_viewed_history_key: historyKey,
              },
            },
            history: {
              [historyKey]: { // add history entry
                action: 'new',
                type: 'member',
                time: timestamp,
                author: uid,
              },
            },
          }

          // user infos
          updates['users/' + uid] = {
            current_tribe: tid,
            email: user.email,
            gravatar,
            lang: values.lang,
            name: values.name,
            registered: timestamp,
            tribes: {
              [tid]: values.tribe_name,
            },
            // birthdate: values.birthdate || null,
            // phone: values.phone || null,
          }

          // private user infos
          updates['users_private/' + uid] = {
            bot_token: rand(32),
          }

          return db.ref().update(updates)
        })
        .then(() => {
          errorOrigin = 'login'
          resolve()
          dispatch(login(user))
        })
        .catch((error) => {
          reject({_error: 'request'})
          dispatch(firebaseError(error, 'submitRegister/' + errorOrigin))
          // silently rollback user creation:
          Promise.all([
            user.delete(),
            auth.signOut(),
          ])
          .catch(() => {})
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
            dispatch(firebaseError(error, 'submitRegister/createUser'))
        }
      })
    })
    .catch((error) => {
      dispatch(apiError(error, 'submitRegister'))
      reject({_error: 'request'})
    })
  })
}
