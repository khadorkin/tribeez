import router from '../router'
import routes from '../routes'

import api from '../utils/api'

import getMember from './getMember'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api[values.id ? 'put' : 'post']('bill', values)
      .then((response) => {
        if (response.error) {
          if (response.error.parts) {
            reject({_error: 'no_parts'})
          } else {
            if (typeof response.error === 'string') {
              response.error = {_error: response.error}
            }
            reject(response.error)
          }
        } else {
          resolve()
          dispatch(getMember()) // to update balance
          router.resetTo(routes.BILLS, dispatch)
        }
      })
      .catch(() => {
        reject({_error: 'other'})
      })
  })
}
