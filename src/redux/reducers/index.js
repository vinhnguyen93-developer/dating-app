import {combineReducers} from 'redux';

import authReducer from './auth';
import tagReducer from './tags';

export default combineReducers({
  auth: authReducer,
  tagReducer,
});
