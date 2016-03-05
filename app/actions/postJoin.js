import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE, GET_MEMBER_SUCCESS} from '../constants/actions'
import routes from '../constants/routes'

export default (payload) => {
  return function(dispatch) {
    dispatch({
      type: JOIN_REQUEST,
    })
    api.post('join', payload)
      .then((response) => {
        if (response.error) {
          dispatch({
            type: JOIN_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: JOIN_SUCCESS,
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
          type: JOIN_FAILURE,
          error: 'other',
        })
      })
  }
}
