import { routeActions } from 'react-router-redux'

import api from '../api'

import { INVITE_REQUEST, INVITE_SUCCESS, INVITE_FAILURE } from '../constants/actions'
import routes from '../constants/routes'

export default (email, lang) => {
  return function(dispatch) {
    dispatch({
      type: INVITE_REQUEST,
    })
    api.post('invite', { email, lang })
      .then((res) => {
        if (res.error) {
          dispatch({
            type: INVITE_FAILURE,
            error: res.error,
          })
        } else {
          dispatch({
            type: INVITE_SUCCESS,
          })
          dispatch(routeActions.push(routes.MEMBERS))
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
