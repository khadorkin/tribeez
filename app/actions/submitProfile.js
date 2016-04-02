import api from '../utils/api'

import {
  PUT_PROFILE_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.put('profile', values)
      .then((response) => {
        if (response.error) {
          if (typeof response.error === 'string') {
            response.error = {_error: response.error}
          }
          reject(response.error)
        } else {
          resolve()
          dispatch({
            type: PUT_PROFILE_SUCCESS,
            values,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'profile_updated',
          })
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
