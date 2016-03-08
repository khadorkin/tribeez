import api from '../utils/api'

import getMember from './getMember'
import getActivity from './getActivity'

import {SNACK_MESSAGE} from '../constants/actions'

import routes from '../constants/routes'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api.post('tribe', values)
      .then((response) => {
        if (response.error) {
          reject(response.error)
        } else {
          resolve()
          // user and tribe have changed, get them from the API and go to home:
          api.clearCache()
          // force redirect to home page:
          dispatch(getMember(null, routes.ACTIVITY))
          dispatch(getActivity())
          dispatch({
            type: SNACK_MESSAGE,
            message: 'tribe_created',
          })
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
