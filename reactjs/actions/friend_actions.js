import axios from 'axios';

export const RECEIVED_FRIENDS = 'RECEIVED_FRIENDS';

// This should return back 5 of the top friends of this user based on common interests
// Twitter API use is a work in progress
export const requestFriends = (screenName) => dispatch => (
  axios({method: 'get', url: '/scrape', params:  {screenName}, xsrfHeaderName: "X-CSRFToken"}).then(friends => {
    return dispatch(receivedFriends(friends.data.screenNames))
  })
);

export const receivedFriends = friends => ({
  type: RECEIVED_FRIENDS,
  friends
});
