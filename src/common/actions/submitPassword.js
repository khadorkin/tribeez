import api from '../utils/api'

import {PASSWORD_SUCCESS} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('password', values)
      .then((response) => {
        if (response.error) {
          if (typeof response.error === 'string') {
            response.error = {_error: response.error}
          }
          reject(response.error)
        } else {
          resolve()
          dispatch({
            type: PASSWORD_SUCCESS,
          })
        }
      })
      .catch(() => {
        reject({_error: 'request'})
      })
  })
}
