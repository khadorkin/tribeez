import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'
import api from '../utils/api'

import {FIREBASE_FAILURE, API_FAILURE, SNACK_MESSAGE} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const ref = db.ref('tribes/' + auth.currentUser.tid + '/invites')
    const token = ref.push().key
    const invite = {
      email: values.email,
      lang: values.lang,
      invited: timestamp,
      inviter: auth.currentUser.uid,
    }
    //TODO: send email
    return ref.child(token).set(invite)
    .then(() => {
      api.post('invite', {
        token,
        email: values.email,
        lang: values.lang,
        tribe: auth.currentUser.tid,
        tribe_name: auth.currentUser.tribe,
        inviter_name: auth.currentUser.name,
      })
      .then((response) => {
        if (response.error) {
          throw response.error
        }
        resolve()
        router.resetTo(routes.MEMBERS, dispatch)
        dispatch({
          type: SNACK_MESSAGE,
          message: 'invite_sent',
        })
      })
      .catch((error) => {
        dispatch({
          type: API_FAILURE,
          origin: 'submitInvite',
          error,
        })
        reject({_error: 'request'})
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'submitInvite',
        error,
      })
      reject({_error: 'request'})
    })
  })
}
