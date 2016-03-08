import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {PASSWORD_SUCCESS} from '../constants/actions'
import routes from '../constants/routes'

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
        Rollbar.error('API error', error)
      })
  })
}
