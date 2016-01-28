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
        if (data.error) {
          dispatch({
            type: LOGIN_FAILURE,
            email,
            emailError: (data.error == 'email'),
            passwordError: (data.error == 'password'),
            otherError: false,
          })
        } else {
          dispatch({
            type: LOGIN_SUCCESS,
            email,
            token: data.token,
          })
          dispatch(routeActions.push('/home'))
        }
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILURE,
          email,
          emailError: false,
          passwordError: false,
          otherError: true,
        })
      })
  }
}
