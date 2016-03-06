import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {GET_MEMBER_SUCCESS} from '../constants/actions'
import routes from '../constants/routes'

export default (destination, values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('login', values)
      .then((response) => {
        if (response.error) {
          reject(response.error)
        } else {
          resolve()
          dispatch({
            type: GET_MEMBER_SUCCESS,
            user: response.user,
            tribe: response.tribe,
          })
          dispatch(routeActions.push(destination || routes.ACTIVITY))
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
        Rollbar.error('API error', error)
      })
  })
}
