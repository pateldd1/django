import { combineReducers } from 'redux';
import FriendReducer from './friend_reducer';

const rootReducer = combineReducers({
  friends: FriendReducer
});

export default rootReducer;
