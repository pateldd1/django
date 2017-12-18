import { merge } from 'lodash';

import {
  RECEIVED_FRIENDS,
} from '../actions/friend_actions';

const defaultState = [];


const FriendReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVED_FRIENDS:
      return action.friends;
    default:
      return state;
  }
};

export default FriendReducer;
