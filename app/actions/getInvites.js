import api from '../utils/api'

import {
  GET_INVITES_REQUEST,
  GET_INVITES_SUCCESS,
  GET_INVITES_FAILURE,
} from '../constants/actions'

export default (page = 0) => {
  return function(dispatch) {
    dispatch({
      type: GET_INVITES_REQUEST,
    })
    api.get('invites', {page})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_INVITES_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_INVITES_SUCCESS,
            data: response,
            page,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INVITES_FAILURE,
          error: err.message,
        })
      })
  }
}
