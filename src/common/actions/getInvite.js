import router from '../router'
import routes from '../routes'

import {db} from '../firebase'

import {
  FIREBASE_REQUEST,
  GET_INVITE_SUCCESS,
  FIREBASE_FAILURE,
} from '../constants/actions'

export default (tribe, token) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    db.ref('tribes/' + tribe + '/invites/' + token).once('value').then((snapshot) => {
      const invite = snapshot.val()
      if (invite) {
        Promise.all([
          db.ref('tribes/' + tribe + '/infos/name').once('value'),
          db.ref('tribes/' + tribe + '/members/' + invite.inviter + '/name').once('value'),
        ]).then((snapshots) => {
          if (snapshots[0] && snapshots[1]) {
            invite.tribe = snapshots[0].val()
            invite.inviter = snapshots[1].val()
            dispatch({
              type: GET_INVITE_SUCCESS,
              data: invite,
            })
            //TODO:
            // if (response.redirect === 'login') {
            //   router.resetTo(routes.LOGIN, dispatch)
            // } else if (response.redirect === 'home') {
            //   router.resetTo(routes.ACTIVITY, dispatch)
            // }
          } else {
            dispatch({
              type: FIREBASE_FAILURE,
              origin: 'getInvite',
              error: 'not_found',
            })
            router.resetTo(routes.LOGIN, dispatch)
          }
        })
      } else {
        dispatch({
          type: FIREBASE_FAILURE,
          origin: 'getInvite',
          error: 'not_found',
        })
        router.resetTo(routes.LOGIN, dispatch)
      }
    })
  }
}
