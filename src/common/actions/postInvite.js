import {db, auth, timestamp} from '../firebase'
import api from '../utils/api'

import {
  REQUEST,
  SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import failure from './failure'

const origin = 'postInvite'

export default (invite) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/invites/' + invite.id).transaction((current) => {
      if (current) {
        current.invited = timestamp
        current.inviter = auth.currentUser.uid
      }
      return current
    })
    .then(() => {
      api.post('invite', {
        token: invite.id,
        email: invite.email,
        lang: invite.lang,
        tribe: auth.currentUser.tid,
        tribe_name: auth.currentUser.tribe,
        inviter: auth.currentUser.uid,
        inviter_name: auth.currentUser.name,
        inviter_email: auth.currentUser.email,
      })
      .then((response) => {
        if (response.error) {
          throw response.error
        }
        dispatch({
          type: SUCCESS,
        })
        dispatch({
          type: SNACK_MESSAGE,
          message: 'invite_resent',
        })
      })
      .catch((error) => {
        dispatch(failure(error, origin, 'api'))
        dispatch({
          type: SNACK_MESSAGE,
          message: 'error',
        })
      })
    })
    .catch((error) => {
      dispatch(failure(error, origin))
      dispatch({
        type: SNACK_MESSAGE,
        message: 'error',
      })
    })
  }
}
