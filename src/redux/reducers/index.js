import {combineReducers} from 'redux';

import authReducer from './auth';
import tagReducer from './tags';
import userReducer from './user';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  tagReducer,
});
