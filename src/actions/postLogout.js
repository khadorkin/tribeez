import {push} from 'react-router-redux'

import api from '../utils/api'

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

import routes from '../constants/routes'

export default () => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    })
    api.post('logout')
      .then((response) => {
        if (response.error) {
          dispatch({
            type: LOGOUT_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: LOGOUT_SUCCESS,
          })
          dispatch(push(routes.WELCOME))
          //TODO: destroy the store
          dispatch({
            type: SNACK_MESSAGE,
            message: 'logout_success',
          })
        }
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FAILURE,
          error: 'other',
        })
        //TODO: show error
      })
  }
}