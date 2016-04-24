import {push} from 'react-router-redux'

import api from '../utils/api'

import routes from '../constants/routes'

export default (values, dispatch) => {
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
          dispatch(push(routes.TASKS))
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
