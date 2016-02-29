import { routeActions } from 'react-router-redux'

import api from '../api'

import { GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE, LOGIN_DESTINATION } from '../constants/actions'

export default (destination, redirectOnLoggedIn, redirectOnAnonymous) => {
  return function(dispatch) {
    dispatch({
      type: GET_MEMBER_REQUEST,
    })

    api.get('member')
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_MEMBER_FAILURE,
            error: response.error,
          })
          if (redirectOnAnonymous) {
            dispatch(routeActions.push(redirectOnAnonymous))
            dispatch({
              type: LOGIN_DESTINATION,
              destination,
            })
          }
        } else {
          dispatch({
            type: GET_MEMBER_SUCCESS,
            user: response.user,
            tribe: response.tribe,
          })
          if (redirectOnLoggedIn) {
            dispatch(routeActions.push(redirectOnLoggedIn))
          }
        }
      })
      .catch(() => {
        dispatch({
          type: GET_MEMBER_FAILURE,
        })
        //TODO: show an error
      })
  }
}
