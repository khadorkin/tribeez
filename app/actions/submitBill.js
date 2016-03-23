import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {
  NEW_BILL_SUCCESS,
  PUT_BILL_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import routes from '../constants/routes'

import getMember from './getMember'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    api[values.id ? 'put' : 'post']('bill', values)
      .then((response) => {
        if (response.error) {
          if (response.error.parts) {
            reject({_error: 'error.no_parts'})
          } else {
            reject(response.error)
          }
        } else {
          resolve()
          dispatch(getMember()) // to update balance
          if (values.id) {
            dispatch({
              type: PUT_BILL_SUCCESS,
              bill: response,
            })
            dispatch({
              type: SNACK_MESSAGE,
              message: 'bill_modified',
            })
          } else {
            dispatch({
              type: NEW_BILL_SUCCESS,
              bill: response,
            })
            dispatch({
              type: SNACK_MESSAGE,
              message: 'bill_added',
            })
          }
          dispatch(routeActions.push(routes.BILLS))
        }
      })
      .catch((error) => {
        reject({_error: error.toString()})
      })
  })
}
