import { routeActions } from 'react-router-redux'

import api from '../api'

import { SWITCH_REQUEST, SWITCH_SUCCESS, SWITCH_FAILURE } from '../constants/actions'
import routes from '../constants/routes'

import getActivity from './getActivity'
import getMember from './getMember'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: SWITCH_REQUEST,
    })
    api.put('switch', { id })
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
          dispatch(getMember())
          // force redirect to home page:
          dispatch(getActivity())
          dispatch(routeActions.push(routes.ACTIVITY))
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
