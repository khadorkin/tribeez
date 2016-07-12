import {
  GET_BILL_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  current: null, // current bill being viewed or edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_BILL_SUCCESS:
      return {
        ...state,
        current: action.data,
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
