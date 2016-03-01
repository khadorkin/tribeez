import {routeActions} from 'react-router-redux'

import api from '../api'

import {RESET_REQUEST, RESET_SUCCESS, RESET_FAILURE, GET_MEMBER_SUCCESS} from '../constants/actions'
import routes from '../constants/routes'

export default (token, password) => {
  return function(dispatch) {
    dispatch({
      type: RESET_REQUEST,
    })
    api.post('reset', {token, password})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: RESET_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: RESET_SUCCESS,
          })
          dispatch({
            type: GET_MEMBER_SUCCESS,
            user: response.user,
            tribe: response.tribe,
          })
          dispatch(routeActions.push(routes.ACTIVITY))
        }
      })
      .catch(() => {
        dispatch({
          type: RESET_FAILURE,
          error: 'other',
        })
      })
  }
}
