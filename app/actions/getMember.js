import { routeActions } from 'react-router-redux'

import api from '../api'

import { GET_MEMBER_REQUEST, GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE } from '../actions'

export default () => {
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
          dispatch(routeActions.push('/login'))
        } else {
          dispatch({
            type: GET_MEMBER_SUCCESS,
            user: data.user,
            tribe: data.tribe,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_MEMBER_FAILURE,
        })
        dispatch(routeActions.push('/login'))
      })

  }
}
