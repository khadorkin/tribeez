import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'

import {FIREBASE_FAILURE, SNACK_MESSAGE} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const invite = {
      email: values.email,
      lang: values.lang,
      invited: timestamp,
      inviter: auth.currentUser.uid,
    }
    //TODO: send email
    return db.ref('tribes/' + values.tribe + '/invites').push(invite)
    .then(() => {
      resolve()
      router.resetTo(routes.MEMBERS, dispatch)
      dispatch({
        type: SNACK_MESSAGE,
        message: 'invite_sent',
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
