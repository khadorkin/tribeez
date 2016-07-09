import md5 from 'md5'

import api from '../utils/api'
import {auth, db, timestamp} from '../firebase'
import {rand} from '../utils/utils'

import {FIREBASE_FAILURE} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('register', {captcha: values.captcha})
    .then((response) => {
      if (response.error) {
        reject(response.error)
      } else {
        auth.createUserWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          const uid = user.uid
          const gravatar = md5(uid)
          let historyKey

          const tid = db.ref('tribes').push().key

          db.ref('tribes/' + tid).set({
            infos: {
              name: values.tribe_name,
              type: values.tribe_type,
              currency: values.currency,
              city_id: values.city.place_id,
            },
            members: {
              [uid]: {
                balance: 0,
                gravatar,
                name: values.name,
              },
            },
          })
          .then(() => {
            const updates = {}

            const user_record = {
              current_tribe: tid,
              email: user.email,
              gravatar,
              lang: values.lang,
              name: values.name,
              tribes: {
                [tid]: values.tribe_name,
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
            updates['tribes/' + tid + '/members/' + uid] = {
              balance: 0,
              gravatar,
              name: values.name,
            }

            // private user infos
            updates['users_private/' + uid] = {
              bot_token: rand(32),
            }

            return db.ref().update(updates)
          })
          .then(() => {
            // city
            db.ref('cities/' + values.city.place_id).transaction((city) => {
              if (!city) {
                city = {
                  country_code: values.city.country_code,
                  name: values.city.name,
                  tribes: {},
                }
              }
              city.tribes[tid] = true
              return city
            })
          })
          .then(() => {
            // add history entry
            historyKey = db.ref('tribes/' + tid + '/history').push().key
            return db.ref('tribes/' + tid + '/history/' + historyKey).set({
              action: 'new',
              type: 'member',
              added: timestamp,
              user: uid,
            })
          })
          .then(resolve)
          .catch((error) => {
            reject({_error: 'request'})
            dispatch({
              type: FIREBASE_FAILURE,
              origin: 'submitRegister',
              error,
            })
            auth.signOut()
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
                origin: 'submitRegister',
                error,
              })
          }
        })
      }
    })
    .catch(() => {
      reject({_error: 'request'})
    })
  })
}
