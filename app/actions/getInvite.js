import { routeActions } from 'react-router-redux'

import api from '../api'

import { GET_INVITE_REQUEST, GET_INVITE_SUCCESS, GET_INVITE_FAILURE } from '../constants/actions'
import routes from '../constants/routes'

export default (token) => {
  return function(dispatch) {
    dispatch({
      type: GET_INVITE_REQUEST,
    })
    api.get('invite', { token })
      .then((data) => {
        if (data.error) {
          dispatch({
            type: GET_INVITE_FAILURE,
          })
          dispatch(routeActions.push(routes.LOGIN))
        } else {
          dispatch({
            type: GET_INVITE_SUCCESS,
            data,
          })
          if (data.redirect) {
            dispatch(routeActions.push(`/${data.redirect}`))
          }
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INVITE_FAILURE,
        })
        dispatch(routeActions.push(routes.LOGIN))
      })
  }
}
