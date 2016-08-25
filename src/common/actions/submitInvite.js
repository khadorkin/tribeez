import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'
import api from '../utils/api'

import {SNACK_MESSAGE} from '../constants/actions'
import failure from './failure'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const ref = db.ref('tribes/' + auth.currentUser.tid + '/invites') //TODO: check existing
    const token = ref.push().key
    const invite = {
      email: values.email,
      lang: values.lang,
      invited: timestamp,
      inviter: auth.currentUser.uid,
    }
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
        if (error.email) {
          reject({email: error.email})
        } else {
          dispatch(failure(error, 'submitInvite', 'api'))
          reject({_error: 'request'})
        }
        ref.child(token).remove()
        .catch(() => {
          dispatch(failure(error, 'submitInvite/rollback'))
        })
      })
    })
    .catch((error) => {
      dispatch(failure(error, 'submitInvite'))
      reject({_error: 'request'})
    })
  })
}
