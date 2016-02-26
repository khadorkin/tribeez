import { routeActions } from 'react-router-redux'

import api from '../api'

import { GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE, LOGIN_DESTINATION } from '../actions'

export default (destination, redirectOnLoggedIn, redirectOnAnonymous) => {
  return function(dispatch) {
    dispatch({
      type: GET_MEMBER_REQUEST,
    })

    api.get('member')
      .then((data) => {
        if (data.error) {
          dispatch({
            type: GET_MEMBER_FAILURE,
            error: data.error,
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
            user: data.user,
            tribe: data.tribe,
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
