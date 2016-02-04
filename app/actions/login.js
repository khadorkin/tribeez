import { routeActions } from 'react-router-redux'

import api from '../api'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'

export default (email, password) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    })
    api.post('login', {
      email,
      password,
    })
      .then((data) => {
        if (data.error) {
          dispatch({
            type: LOGIN_FAILURE,
            error: data.error,
          })
        } else {
          dispatch({
            type: LOGIN_SUCCESS,
          })
          dispatch(routeActions.push('/home'))
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILURE,
          error: 'other',
        })
      })
  }
}
