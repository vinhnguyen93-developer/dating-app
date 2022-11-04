import {combineReducers} from 'redux';

import authReducer from './auth';
import tagReducer from './tags';
import userReducer from './user';
import chatReducer from './chats';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  chats: chatReducer,
  tagReducer,
});
