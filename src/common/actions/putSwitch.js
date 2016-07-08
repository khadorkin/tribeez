import api from '../utils/api'

import {
  SWITCH_REQUEST,
  SWITCH_SUCCESS,
  SWITCH_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
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
          // force redirect to home page:
          // dispatch(getMember(null, routes.ACTIVITY))
          // dispatch(getActivity())
          // dispatch(getHistory())
          dispatch({
            type: SNACK_MESSAGE,
            message: 'switched',
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: SWITCH_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
