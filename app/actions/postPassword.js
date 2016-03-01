import { routeActions } from 'react-router-redux'

import api from '../api'

import { PASSWORD_REQUEST, PASSWORD_SUCCESS, PASSWORD_FAILURE } from '../constants/actions'
import routes from '../constants/routes'

export default (email, lang) => {
  return function(dispatch) {
    dispatch({
      type: PASSWORD_REQUEST,
    })
    api.post('password', { email, lang })
      .then((response) => {
        if (response.error) {
          dispatch({
            type: PASSWORD_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: PASSWORD_SUCCESS,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: PASSWORD_FAILURE,
          error: 'other',
        })
      })
  }
}
