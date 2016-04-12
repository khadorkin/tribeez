import {push} from 'react-router-redux'

import api from '../utils/api'

import {
  NEW_POLL_SUCCESS,
  PUT_POLL_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import routes from '../constants/routes'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    values.options = values.options.filter((option) => option)
    if (values.options.length < 2) {
      reject({_error: 'no_options'})
      return
    }
    api[values.id ? 'put' : 'post']('poll', values)
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
              type: PUT_POLL_SUCCESS,
              poll: response,
            })
            dispatch({
              type: SNACK_MESSAGE,
              message: 'poll_updated',
            })
          } else {
            dispatch({
              type: NEW_POLL_SUCCESS,
              poll: response,
            })
            dispatch({
              type: SNACK_MESSAGE,
              message: 'poll_created',
            })
          }
          dispatch(push(routes.POLLS))
        }
      })
      .catch(() => {
        reject({_error: 'other'})
      })
  })
}
