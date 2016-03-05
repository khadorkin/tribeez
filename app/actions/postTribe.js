import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {NEW_TRIBE_REQUEST, NEW_TRIBE_SUCCESS, NEW_TRIBE_FAILURE} from '../constants/actions'
import routes from '../constants/routes'

import getMember from './getMember'

export default (payload) => {
  return function(dispatch) {
    dispatch({
      type: NEW_TRIBE_REQUEST,
    })
    api.post('tribe', payload)
      .then((response) => {
        if (response.error) {
          dispatch({
            type: NEW_TRIBE_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: NEW_TRIBE_SUCCESS,
            tribe: response,
          })
          // user and tribe have changed, get them from the API and go to home:
          dispatch(getMember(routes.ACTIVITY, routes.ACTIVITY))
        }
      })
      .catch(() => {
        dispatch({
          type: NEW_TRIBE_FAILURE,
          error: 'other',
        })
      })
  }
}
