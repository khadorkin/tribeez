import api from '../utils/api'

import {
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
            type: SNACK_MESSAGE,
            message: 'profile_updated',
          })
        }
      })
      .catch(() => {
        reject({_error: 'request'})
      })
  })
}
