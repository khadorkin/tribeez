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
          //TODO: understand why the UI doesn't reflect the new lang if this dispatch is placed after the GET_INVITE_SUCCESS one:
          dispatch({
            type: UPDATE_LANG,
            lang: data.lang,
          })
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
