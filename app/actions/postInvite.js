import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {INVITE_REQUEST, INVITE_SUCCESS, INVITE_FAILURE, SNACK_MESSAGE} from '../constants/actions'

import routes from '../constants/routes'

export default (values) => {
  return function(dispatch) {
    dispatch({
      type: INVITE_REQUEST,
    })
    api.post('invite', values)
      .then((response) => {
        if (response.error) {
          dispatch({
            type: INVITE_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: INVITE_SUCCESS,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'invite_resent',
          })
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
