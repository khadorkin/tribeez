import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {GET_MEMBER_SUCCESS} from '../constants/actions'

import routes from '../constants/routes'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('join', values)
      .then((response) => {
        if (response.error) {
          if (response.error.email) {
            response.error.email = {
              id: response.error._suggestion ? 'invalid_suggestion' : response.error.email,
              suggestion: response.error._suggestion,
            }
            delete response.error._suggestion
          }
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
          dispatch(routeActions.push(routes.ACTIVITY))
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
