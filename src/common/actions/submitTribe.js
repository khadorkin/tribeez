import {auth, db} from '../firebase'

import {
  SNACK_MESSAGE,
  FIREBASE_FAILURE,
} from '../constants/actions'

import router from '../router'
import routes from '../routes'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    db.ref('tribes/' + auth.currentUser.tid + '/infos').transaction((infos) => {
      infos.name = values.tribe_name
      infos.type = values.tribe_type
      infos.currency = values.currency
      infos.city = values.city
      return infos
    })
    .then(() => {
      // remove from current city
      db.ref('cities/' + values.current_city + '/tribes/' + auth.currentUser.tid).remove()
    })
    .then(() => {
      // add to new city
      db.ref('cities/' + values.city.place_id).transaction((city) => {
        if (!city) {
          city = values.city
          delete city.place_id // it's already the key
        }
        if (!city.tribes) {
          city.tribes = {}
        }
        city.tribes[auth.currentUser.tid] = true
        return city
      })
    })
    .then(() => {
      auth.currentUser.tribe = values.tribe_name
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
        origin: 'submitTribe',
        error,
      })
    })

    // router.resetTo(routes.ACTIVITY, dispatch)
    // dispatch({
    //   type: SNACK_MESSAGE,
    //   message: 'tribe_created',
    // })
  })
}
