import { routeActions } from 'react-router-redux'

import api from '../api'

import { GET_INVITE_REQUEST, GET_INVITE_SUCCESS, GET_INVITE_FAILURE, UPDATE_LANG } from '../actions'

export default (token) => {
  return function(dispatch) {
    dispatch({
      type: GET_INVITE_REQUEST,
    })
    api.get('invitation', { token })
      .then((data) => {
        if (data.error) {
          dispatch({
            type: GET_INVITE_FAILURE,
          })
          dispatch(routeActions.push('/login'))
        } else {
          dispatch({
            type: GET_INVITE_SUCCESS,
            data,
          })
          if (data.redirect) {
            dispatch(routeActions.push('/' + data.redirect))
          }
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INVITE_FAILURE,
        })
        dispatch(routeActions.push('/login'))
      })
  }
}
