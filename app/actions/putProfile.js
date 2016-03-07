import {routeActions} from 'react-router-redux'

import validate from '../utils/formValidator'
import api from '../utils/api'

import {PUT_PROFILE_SUCCESS} from '../constants/actions'

export default (values, dispatch) => {
  // front-end validation:
  const errors = validate('profile', values)
  if (errors) {
    return Promise.reject(errors)
  }
  // back-end validation:
  return new Promise((resolve, reject) => {
    api.put('profile', values)
      .then((response) => {
        if (response.error) {
          reject(response.error)
        } else {
          resolve()
          dispatch({
            type: PUT_PROFILE_SUCCESS,
            values,
          })
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
        Rollbar.error('API error', error)
      })
  })
}
