import { routeActions } from 'react-router-redux'

import api from '../api'

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS } from '../constants/actions'
import routes from '../constants/routes'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    })
    api.post('register', data)
      .then((res) => {
        if (res.error) {
          dispatch({
            type: REGISTER_FAILURE,
            error: res.error,
          })
        } else {
          dispatch({
            type: REGISTER_SUCCESS,
          })
          dispatch({
            type: LOGIN_SUCCESS,
          })
          dispatch(routeActions.push(routes.ACTIVITY))
        }
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FAILURE,
          error: 'other',
        })
      })
  }
}
