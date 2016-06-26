import router from '../router'
import routes from '../routes'

import api from '../utils/api'

import {GET_MEMBER_SUCCESS} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('register', values)
      .then((response) => {
        if (response.error) {
          if (typeof response.error === 'string') {
            response.error = {_error: response.error}
          }
          response.error._backend = true // to reset the captcha
          if (response.error.email) {
            response.error.email = {
              id: response.error._suggestion ? 'invalid_suggestion' : response.error.email,
              suggestion: response.error._suggestion,
            }
            delete response.error._suggestion
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
        }
      })
      .catch(() => {
        reject({_error: 'request'})
      })
  })
}
