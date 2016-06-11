import router from '../router'
import routes from '../routes'

import api from '../utils/api'

export default (values, dispatch) => {
  values.users = values.users
    .filter((task_user) => task_user.checked)
    .map((task_user) => task_user.user_id)

  return new Promise((resolve, reject) => {
    api[values.id ? 'put' : 'post']('task', values)
      .then((response) => {
        if (response.error) {
          if (typeof response.error === 'string') {
            response.error = {_error: response.error}
          }
          reject(response.error)
        } else {
          resolve()
          router.resetTo(routes.TASKS, dispatch)
        }
      })
      .catch(() => {
        reject({_error: 'other'})
      })
  })
}
