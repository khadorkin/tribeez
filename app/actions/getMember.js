import { routeActions } from 'react-router-redux'

import api from '../api'

import { GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE } from '../actions'

export default (redirectOnLoggedIn, redirectOnAnonymous) => {
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
