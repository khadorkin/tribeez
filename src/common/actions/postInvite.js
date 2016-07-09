import {db, auth, timestamp} from '../firebase'
import api from '../utils/api'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  API_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (invite) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/invites/' + invite.key).transaction((current) => {
      if (current) {
        current.invited = timestamp
        current.inviter = auth.currentUser.uid
      }
      return current
    })
    .then(() => {
      api.post('invite', {
        token: invite.key,
        email: invite.email,
        lang: invite.lang,
        tribe: auth.currentUser.tid,
        tribe_name: auth.currentUser.tribe,
        inviter_name: auth.currentUser.name,
      })
      .then((response) => {
        if (response.error) {
          throw response.error
        }
        dispatch({
          type: FIREBASE_SUCCESS,
        })
        dispatch({
          type: SNACK_MESSAGE,
          message: 'invite_resent',
        })
      })
      .catch((error) => {
        dispatch({
          type: API_FAILURE,
          origin: 'submitInvite',
          error,
        })
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'postInvite',
        error: error.code,
      })
    })
  }
}
