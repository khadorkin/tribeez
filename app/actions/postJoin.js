import { routeActions } from 'react-router-redux'

import api from '../api'

import { JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE, LOGIN_SUCCESS } from '../constants/actions'
import routes from '../constants/routes'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: JOIN_REQUEST,
    })
    api.post('join', data)
      .then((res) => {
        if (res.error) {
          dispatch({
            type: JOIN_FAILURE,
            error: res.error,
          })
        } else {
          dispatch({
            type: JOIN_SUCCESS,
          })
          dispatch({
            type: LOGIN_SUCCESS,
          })
          dispatch(routeActions.push(routes.ACTIVITY))
        }
      })
      .catch(() => {
        dispatch({
          type: JOIN_FAILURE,
          error: 'other',
        })
      })
  }
}
