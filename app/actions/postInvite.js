import { routeActions } from 'react-router-redux'

import api from '../api'

import { INVITE_REQUEST, INVITE_SUCCESS, INVITE_FAILURE, INVITE_END } from '../actions'

export default (email, lang) => {
  return function(dispatch) {
    dispatch({
      type: INVITE_REQUEST,
    })
    api.post('invite', { email, lang })
      .then((res) => {
        if (res.error) {
          dispatch({
            type: INVITE_FAILURE,
            error: res.error,
          })
        } else {
          dispatch({
            type: INVITE_SUCCESS,
          })
          setTimeout(() => {
            dispatch({
              type: INVITE_END,
            })
          }, 5000)
        }
      })
      .catch(() => {
        dispatch({
          type: INVITE_FAILURE,
          error: 'other',
        })
      })
  }
}
