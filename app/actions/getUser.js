import { routeActions } from 'react-router-redux'

import api from '../api'

import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE } from '../actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    })

    api.get('member')
      .then((data) => {
        if (data.error) {
          dispatch({
            type: GET_USER_FAILURE,
            error: data.error,
          })
          dispatch(routeActions.push('/login'))
        } else {
          dispatch({
            type: GET_USER_SUCCESS,
            user: data.user,
            tribe: data.tribe,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILURE,
        })
        dispatch(routeActions.push('/login'))
      })

  }
}
