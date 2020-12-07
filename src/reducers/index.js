import { combineReducers } from 'redux';
import { showHomies } from './homies';


const rootReducer = combineReducers({
  homie: showHomies
});

export default rootReducer;
