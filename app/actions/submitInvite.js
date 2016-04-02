import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {SNACK_MESSAGE} from '../constants/actions'

import routes from '../constants/routes'

import getInvites from './getInvites'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('invite', values)
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
          dispatch(getInvites()) //TODO: replace by a dispatch
          dispatch(routeActions.push(routes.MEMBERS))
          dispatch({
            type: SNACK_MESSAGE,
            message: 'invite_sent',
          })
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
