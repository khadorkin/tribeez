import { routeActions } from 'react-router-redux'

import api from '../api'

import { GET_INVITE_REQUEST, GET_INVITE_SUCCESS, GET_INVITE_FAILURE } from '../actions'

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
