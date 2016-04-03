import api from '../utils/api'

import {
  NEW_EVENT_SUCCESS,
  PUT_EVENT_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api[values.id ? 'put' : 'post']('event', values)
      .then((response) => {
        if (response.error) {
          if (typeof response.error === 'string') {
            response.error = {_error: response.error}
          }
          reject(response.error)
        } else {
          resolve()
          if (values.id) {
            dispatch({
              type: PUT_EVENT_SUCCESS,
              values,
            })
            dispatch({
              type: SNACK_MESSAGE,
              message: 'event_updated',
            })
          } else {
            dispatch({
              type: NEW_EVENT_SUCCESS,
              values,
            })
            dispatch({
              type: SNACK_MESSAGE,
              message: 'event_created',
            })
          }
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
