import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, GET_MEMBER_SUCCESS} from '../constants/actions'
import routes from '../constants/routes'

export default (payload) => {
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    })
    api.post('register', payload)
      .then((response) => {
        if (response.error) {
          dispatch({
            type: REGISTER_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: REGISTER_SUCCESS,
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
          type: REGISTER_FAILURE,
          error: 'other',
        })
      })
  }
}
