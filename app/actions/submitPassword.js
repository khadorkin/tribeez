import api from '../utils/api'

import {PASSWORD_SUCCESS} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('password', values)
      .then((response) => {
        if (response.error) {
          reject(response.error)
        } else {
          resolve()
          dispatch({
            type: PASSWORD_SUCCESS,
          })
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
