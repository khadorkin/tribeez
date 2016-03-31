import api from '../utils/api'

import {
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
} from '../constants/actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_NOTES_REQUEST,
    })
    api.get('notes')
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_NOTES_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_NOTES_SUCCESS,
            list: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_NOTES_FAILURE,
          error: err.message,
        })
      })
  }
}
