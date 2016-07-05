import api from '../utils/api'

import {
  SNACK_MESSAGE,
} from '../constants/actions'

import router from '../router'
import routes from '../routes'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api[values.id ? 'put' : 'post']('tribe', values)
      .then((response) => {
        if (response.error) {
          if (typeof response.error === 'string') {
            response.error = {_error: response.error}
          }
          reject(response.error)
        } else {
          resolve()
          if (values.id) {
            dispatch({
              type: SNACK_MESSAGE,
              message: 'tribe_updated',
            })
          } else {
            router.resetTo(routes.ACTIVITY, dispatch)
            // user and tribe have changed, get them from the API:
            // dispatch(getMember())
            // dispatch(getActivity())
            dispatch({
              type: SNACK_MESSAGE,
              message: 'tribe_created',
            })
          }
        }
      })
      .catch(() => {
        reject({_error: 'request'})
      })
  })
}
