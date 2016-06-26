import router from '../router'
import routes from '../routes'

import api from '../utils/api'

import {
  GET_RESET_REQUEST,
  GET_RESET_SUCCESS,
  GET_RESET_FAILURE,
} from '../constants/actions'

export default (token) => {
  return function(dispatch) {
    dispatch({
      type: GET_RESET_REQUEST,
    })
    api.get('reset', {token})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_RESET_FAILURE,
          })
          router.resetTo(routes.LOGIN, dispatch)
        } else {
          dispatch({
            type: GET_RESET_SUCCESS,
            data: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_RESET_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
        router.resetTo(routes.LOGIN, dispatch)
      })
  }
}
