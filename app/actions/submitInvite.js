import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {SNACK_MESSAGE} from '../constants/actions'

import routes from '../constants/routes'

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
          reject(response.error)
        } else {
          api.clearCache('invites') // TODO: could be replaced by a dispatch to avoid API call
          resolve()
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
