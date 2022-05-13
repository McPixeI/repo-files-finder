import { STATUSES } from '../constants/statuses'

export const filesReducer = (state, action) => {
  switch (action.type) {
    case STATUSES.IDLE:
      return {
        ...state,
        files: [],
        status: STATUSES.IDLE,
        error: null
      }
    case STATUSES.LOADING:
      return {
        ...state,
        status: STATUSES.LOADING,
        error: null
      }
    case STATUSES.SUCCES:
      return {
        ...state,
        files: action.payload,
        status: STATUSES.SUCCES,
        error: null
      }
    case STATUSES.ERROR:
      return {
        ...state,
        status: STATUSES.ERROR,
        error: action.payload
      }
    default:
      return state
  }
}
