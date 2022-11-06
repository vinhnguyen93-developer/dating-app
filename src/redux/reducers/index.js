import {combineReducers} from 'redux';

import authReducer from './auth';
import tagReducer from './tags';
import userReducer from './user';
import chatReducer from './chats';
import messageReducer from './message';

export default combineReducers({
  auth: authReducer,
  user: userReducer,
  chats: chatReducer,
  message: messageReducer,
  tagReducer,
});
