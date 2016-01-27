import { routeActions } from 'react-router-redux'

import api from '../api'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'

export default (email, password) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
      email,
    })
    api.get('login', {
      email,
      password,
    })
      .then((data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          email,
          token: data.token,
        })
        dispatch(routeActions.push('/home'))
      })
      .catch((err) => {
        console.error('API error:', err)
        dispatch({
          type: LOGIN_FAILURE,
          email,
        })
      })
  }
}
