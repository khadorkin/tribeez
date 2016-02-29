import { routeActions } from 'react-router-redux'

import api from '../api'

import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../constants/actions'
import routes from '../constants/routes'

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
          dispatch(routeActions.push(routes.WELCOME))
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FAILURE,
          error: 'other',
        })
      })
  }
}
