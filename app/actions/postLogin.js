import {routeActions} from 'react-router-redux'

import api from '../api'

import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE} from '../constants/actions'
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
      .then((response) => {
        if (response.error) {
          dispatch({
            type: LOGIN_FAILURE,
            error: response.error,
          })
          dispatch({
            type: GET_MEMBER_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: LOGIN_SUCCESS,
          })
          dispatch({
            type: GET_MEMBER_SUCCESS,
            user: response.user,
            tribe: response.tribe,
          })
          dispatch(routeActions.push(destination || routes.ACTIVITY))
        }
      })
      .catch(() => {
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
