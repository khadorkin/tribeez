import router from '../router'
import routes from '../routes'

import {db} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  GET_INVITE_SUCCESS,
} from '../constants/actions'

import {firebaseError} from './error'

export default (tribe, token) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    db.ref('tribes/' + tribe + '/invites/' + token).once('value')
    .then((snapshot) => {
      const invite = snapshot.val()
      if (invite) {
        Promise.all([
          db.ref('tribes/' + tribe + '/infos/name').once('value'),
          db.ref('tribes/' + tribe + '/members/' + invite.inviter + '/name').once('value'),
        ]).then((snapshots) => {
          if (snapshots[0] && snapshots[1]) {
            invite.tribe = tribe
            invite.tribe_name = snapshots[0].val()
            invite.inviter_name = snapshots[1].val()
            dispatch({
              type: GET_INVITE_SUCCESS,
              data: invite,
            })
            dispatch({
              type: FIREBASE_SUCCESS,
            })
            //TODO:
            // if (response.redirect === 'login') {
            //   router.resetTo(routes.LOGIN, dispatch)
            // } else if (response.redirect === 'home') {
            //   router.resetTo(routes.ACTIVITY, dispatch)
            // }
          } else {
            dispatch(firebaseError('not_found', 'getInvite/infos'))
            router.resetTo(routes.LOGIN, dispatch)
          }
        })
      } else {
        dispatch(firebaseError('not_found', 'getInvite/token'))
        router.resetTo(routes.LOGIN, dispatch)
      }
    })
    .catch((error) => {
      dispatch(firebaseError(error, 'getInvite'))
    })
  }
}
