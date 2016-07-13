import {
  ITEM,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  bill: null, // current bill being viewed or edited
  event: null, // current event being viewed or edited
  poll: null, // current poll being viewed or edited
  task: null, // current task being viewed or edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case ITEM:
      return {
        ...state,
        [action.itemType]: action.data,
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
