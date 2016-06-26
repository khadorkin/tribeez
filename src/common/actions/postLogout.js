import router from '../router'
import routes from '../routes'

import api from '../utils/api'

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    })
    api.post('logout')
      .then((response) => {
        if (response.error) {
          dispatch({
            type: LOGOUT_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: LOGOUT_SUCCESS,
          })
          router.resetTo(routes.WELCOME, dispatch) //TODO: fixme on mobile (?!?#@&)
          //TODO: destroy the store
          dispatch({
            type: SNACK_MESSAGE,
            message: 'logout_success',
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
