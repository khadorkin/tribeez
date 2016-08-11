import router from '../router'
import routes from '../routes'

import api from '../utils/api'

import {
  API_REQUEST,
  API_SUCCESS,
  GET_INVITE_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import {apiError} from './error'
import autoLogin from './autoLogin'

export default (tribe, token) => {
  return (dispatch) => {
    dispatch({
      type: API_REQUEST,
    })

    api.get('invite', {tribe, token})
    .then((invite) => {
      dispatch({
        type: API_SUCCESS,
      })
      if (invite) {
        dispatch({
          type: GET_INVITE_SUCCESS,
          data: invite,
        })
        if (invite.converted) { // the invite just got converted into a membership => log the user in
          router.resetTo(routes.LOGIN, dispatch)
          dispatch(autoLogin())
          dispatch({
            type: SNACK_MESSAGE,
            message: 'joined',
            name: invite.tribe_name,
          })
        }
      } else {
        router.resetTo(routes.WELCOME, dispatch)
      }
    })
    .catch((error) => {
      dispatch(apiError(error, 'getInvite'))
    })
  }
}
