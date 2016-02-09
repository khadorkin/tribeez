import { routeActions } from 'react-router-redux'

import api from '../api'

import { LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from '../actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    })
    api.get('logout')
      .then((data) => {
        if (data.error) {
          dispatch({
            type: LOGOUT_FAILURE,
            error: data.error,
          })
        } else {
          dispatch({
            type: LOGOUT_SUCCESS,
          })
          dispatch(routeActions.push('/'))
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILURE,
          error: 'other',
        })
      })
  }
}
