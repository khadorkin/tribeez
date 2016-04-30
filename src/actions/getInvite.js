import {push} from 'react-router-redux'

import api from '../utils/api'

import {
  GET_INVITE_REQUEST,
  GET_INVITE_SUCCESS,
  GET_INVITE_FAILURE,
} from '../constants/actions'

import routes from '../constants/routes'

export default (token) => {
  return function(dispatch) {
    dispatch({
      type: GET_INVITE_REQUEST,
    })
    api.get('invite', {token})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_INVITE_FAILURE,
          })
          dispatch(push(routes.LOGIN))
        } else {
          dispatch({
            type: GET_INVITE_SUCCESS,
            data: response,
          })
          if (response.redirect) {
            dispatch(push(`/${response.redirect}`))
          }
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INVITE_FAILURE,
        })
        dispatch(push(routes.LOGIN))
      })
  }
}