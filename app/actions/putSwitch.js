import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {SWITCH_REQUEST, SWITCH_SUCCESS, SWITCH_FAILURE} from '../constants/actions'
import routes from '../constants/routes'

import getMember from './getMember'
import getActivity from './getActivity'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: SWITCH_REQUEST,
    })
    api.put('switch', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: SWITCH_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: SWITCH_SUCCESS,
          })
          // user and tribe have changed, get them from the API and go to home:
          api.clearCache()
          // force redirect to home page:
          dispatch(getMember(null, routes.ACTIVITY))
          dispatch(getActivity())
        }
      })
      .catch(() => {
        dispatch({
          type: SWITCH_FAILURE,
          error: 'other',
        })
      })
  }
}
