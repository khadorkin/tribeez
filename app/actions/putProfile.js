import {routeActions} from 'react-router-redux'

import api from '../api'

import {PUT_PROFILE_REQUEST, PUT_PROFILE_SUCCESS, PUT_PROFILE_FAILURE} from '../constants/actions'

export default (payload) => {
  return function(dispatch) {
    dispatch({
      type: PUT_PROFILE_REQUEST,
    })
    api.put('profile', payload)
      .then((response) => {
        if (response.error) {
          dispatch({
            type: PUT_PROFILE_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: PUT_PROFILE_SUCCESS,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: PUT_PROFILE_FAILURE,
          error: 'other',
        })
      })
  }
}
