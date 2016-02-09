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
          dispatch(routeActions.push('/join/' + token)) // reload view to reload lang changed in 'app' reducer
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
