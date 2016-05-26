import router from '../router'
import routes from '../routes'

import api from '../utils/api'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    values.options = values.options.filter((option) => option)
    if (values.options.length < 2) {
      reject({_error: 'no_options'})
      return
    }
    api[values.id ? 'put' : 'post']('poll', values)
      .then((response) => {
        if (response.error) {
          if (typeof response.error === 'string') {
            response.error = {_error: response.error}
          }
          reject(response.error)
        } else {
          resolve()
          router.resetTo(routes.POLLS, dispatch)
        }
      })
      .catch(() => {
        reject({_error: 'other'})
      })
  })
}
