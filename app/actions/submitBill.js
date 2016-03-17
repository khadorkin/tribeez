import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {
  NEW_BILL_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import routes from '../constants/routes'

import getMember from './getMember'

export default (values, dispatch) => {
  values.amount = Number(values.amount)
  values.parts = values.parts.filter((part) => {
    part.amount = Number(part.amount)
    return part.amount
  })
  return new Promise((resolve, reject) => {
    api.post('bill', values)
      .then((response) => {
        if (response.error) {
          if (response.error.parts) {
            reject({_error: 'error.no_parts'})
          } else {
            reject(response.error)
          }
        } else {
          resolve()
          dispatch(getMember())
          dispatch({
            type: NEW_BILL_SUCCESS,
            bill: response,
          })
          dispatch(routeActions.push(routes.BILLS))
          dispatch({
            type: SNACK_MESSAGE,
            message: 'bill_added',
          })
        }
      })
      .catch((error) => {
        reject({_error: 'error.other'})
      })
  })
}
