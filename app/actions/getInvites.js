import api from '../api'

import {GET_INVITES_REQUEST, GET_INVITES_SUCCESS, GET_INVITES_FAILURE} from '../constants/actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_INVITES_REQUEST,
    })

    api.get('invites', {start: 0, limit: 10}) //TODO: paging
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_INVITES_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_INVITES_SUCCESS,
            list: response,
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
