import router from '../router'
import routes from '../routes'

import {db, auth} from '../firebase'

import {SNACK_MESSAGE} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const invite = {
      email: values.email,
      lang: values.lang,
      invited: Date.now(),
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
    .catch(() => {
      // console.error('error adding invite', error)
      reject({_error: 'request'})
    })
  })
}
