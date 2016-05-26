import {
  PASSWORD_SUCCESS,
} from '../constants/actions'

const initialState = {
  sent: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case PASSWORD_SUCCESS:
      return {
        ...state,
        sent: true,
      }
    default:
      return state
  }
}
