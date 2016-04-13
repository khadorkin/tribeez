import {push} from 'react-router-redux'

import api from '../utils/api'

import {
  NEW_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import routes from '../constants/routes'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api[values.id ? 'put' : 'post']('event', values)
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
              type: UPDATE_EVENT_SUCCESS,
              event: response,
            })
            dispatch({
              type: SNACK_MESSAGE,
              message: 'event_updated',
            })
          } else {
            dispatch({
              type: NEW_EVENT_SUCCESS,
              event: response,
            })
            dispatch({
              type: SNACK_MESSAGE,
              message: 'event_created',
            })
          }
          dispatch(push(routes.EVENTS))
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
