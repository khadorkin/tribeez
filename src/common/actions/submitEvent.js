import router from '../router'
import routes from '../routes'

import api from '../utils/api'

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
          router.resetTo(routes.EVENTS, dispatch)
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
