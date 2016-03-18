import {routeActions} from 'react-router-redux'

import api from '../utils/api'

import {
  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  GET_BILL_FAILURE,
} from '../constants/actions'

import routes from '../constants/routes'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: GET_BILL_REQUEST,
    })
    api.get('bill', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_BILL_FAILURE,
          })
        } else {
          dispatch({
            type: GET_BILL_SUCCESS,
            data: response,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_BILL_FAILURE,
        })
      })
  }
}
