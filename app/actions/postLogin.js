import { routeActions } from 'react-router-redux'

import api from '../api'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE } from '../constants/actions'
import routes from '../constants/routes'

export default (email, password, destination) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    })
    dispatch({
      type: GET_MEMBER_REQUEST,
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
          dispatch({
            type: GET_MEMBER_FAILURE,
            error: data.error,
          })
        } else {
          dispatch({
            type: LOGIN_SUCCESS,
          })
          dispatch({
            type: GET_MEMBER_SUCCESS,
            user: data.user,
            tribe: data.tribe,
          })
          dispatch(routeActions.push(destination || routes.ACTIVITY))
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILURE,
          error: 'other',
        })
        dispatch({
          type: GET_MEMBER_FAILURE,
          error: 'other',
        })
      })
  }
}
