import { SHOW_HOMIES } from '../actions';

const initialState = {
  list: []
}
export function showHomies (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_HOMIES':
      return Object.assign({}, state, {list: action.payload})
    default:
      return state
  }
}
