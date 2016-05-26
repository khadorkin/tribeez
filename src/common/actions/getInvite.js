import router from '../router'
import routes from '../routes'

import api from '../utils/api'

import {
  GET_INVITE_REQUEST,
  GET_INVITE_SUCCESS,
  GET_INVITE_FAILURE,
} from '../constants/actions'

export default (token) => {
  return function(dispatch) {
    dispatch({
      type: GET_INVITE_REQUEST,
    })
    api.get('invite', {token})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_INVITE_FAILURE,
          })
          router.resetTo(routes.LOGIN, dispatch)
        } else {
          dispatch({
            type: GET_INVITE_SUCCESS,
            data: response,
          })
          if (response.redirect) {
            router.resetTo(`/${response.redirect}`, dispatch) //TODO: mobile version
          }
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INVITE_FAILURE,
        })
        router.resetTo(routes.LOGIN, dispatch)
      })
  }
}
