import {auth, db, timestamp} from '../firebase'

import {
  SNACK_MESSAGE,
  FIREBASE_FAILURE,
} from '../constants/actions'

import router from '../router'
import routes from '../routes'

import getMember from './getMember'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const uid = auth.currentUser.uid

    // EDIT CURRENT TRIBE:
    if (values.id) {
      const tid = auth.currentUser.tid
      db.ref('tribes/' + tid + '/infos').transaction((infos) => {
        infos.name = values.tribe_name
        infos.type = values.tribe_type
        infos.currency = values.currency
        infos.city = values.city
        infos.created = timestamp
        return infos
      })
      .then(() => {
        // remove from current city
        return db.ref('cities/' + values.current_city + '/tribes/' + tid).remove()
      })
      .then(() => {
        auth.currentUser.tribe = values.tribe_name
        // add to new city
        return db.ref('cities/' + values.city.place_id).transaction((city) => {
          if (!city) {
            city = values.city
            delete city.place_id // it's already the key
          }
          if (!city.tribes) {
            city.tribes = {}
          }
          city.tribes[tid] = true
          return city
        })
      })
      .then(() => {
        resolve()
        dispatch({
          type: SNACK_MESSAGE,
          message: 'tribe_updated',
        })
      })
      .catch((error) => {
        reject({_error: 'request'})
        dispatch({
          type: FIREBASE_FAILURE,
          origin: 'submitTribe/edit',
          error,
        })
      })

    // CREATE NEW TRIBE:
    } else {
      const tid = db.ref('tribes').push().key

      db.ref('tribes/' + tid).set({
        infos: {
          name: values.tribe_name,
          type: values.tribe_type,
          currency: values.currency,
          city: values.city,
        },
        members: {
          [uid]: {
            balance: 0,
            gravatar: auth.currentUser.gravatar,
            name: auth.currentUser.name,
          },
        },
      })
      .then(() => {
        auth.currentUser.tid = tid
        auth.currentUser.tribe = values.tribe_name
        // add to new city
        return db.ref('cities/' + values.city.place_id).transaction((city) => {
          if (!city) {
            city = values.city
            delete city.place_id // it's already the key
          }
          if (!city.tribes) {
            city.tribes = {}
          }
          city.tribes[tid] = true
          return city
        })
      })
      .then(() => {
        return db.ref('users/' + uid).transaction((user) => {
          user.current_tribe = tid
          user.tribes[tid] = values.tribe_name
          return user
        })
      })
      .then(() => {
        // add history entry
        return db.ref('tribes/' + tid + '/history').push({
          action: 'new',
          type: 'member',
          time: timestamp,
          user: uid,
        })
      })
      .then(() => {
        dispatch(getMember.off())
        dispatch(getMember.on(uid))
        resolve()
        router.resetTo(routes.ACTIVITY, dispatch)
        dispatch({
          type: SNACK_MESSAGE,
          message: 'tribe_created',
        })
      })
      .catch((error) => {
        reject({_error: 'request'})
        dispatch({
          type: FIREBASE_FAILURE,
          origin: 'submitTribe/new',
          error,
        })
      })
    }
  })
}
