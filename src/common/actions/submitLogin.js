import router from '../router'
import routes from '../routes'

import api from '../utils/api'

import {GET_MEMBER_SUCCESS} from '../constants/actions'

export default (destination, values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('login', values)
      .then((response) => {
        if (response.error) {
          if (typeof response.error === 'string') {
            response.error = {_error: response.error}
          }
          reject(response.error)
        } else {
          resolve()
          dispatch({
            type: GET_MEMBER_SUCCESS,
            user: response.user,
            tribe: response.tribe,
          })
          router.resetTo(destination || routes.ACTIVITY, dispatch)
        }
      })
      .catch(() => {
        reject({_error: 'request'})
      })
  })
}
