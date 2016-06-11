import router from '../router'
import routes from '../routes'

import api from '../utils/api'

import {
  GET_MEMBER_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('reset', values)
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
          router.resetTo(routes.ACTIVITY, dispatch)
          dispatch({
            type: SNACK_MESSAGE,
            message: 'password_changed',
          })
        }
      })
      .catch(() => {
        reject({_error: 'other'})
      })
  })
}
