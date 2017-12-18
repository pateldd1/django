import { requestFriends } from '../actions/friend_actions';
import {connect} from 'react-redux';
import App from './App';

let mapStateToProps = (state) => {
  return {
    friends: state.friends
  }
}

let mapDispatchToProps = (dispatch) => {
  return { requestFriends: (screenName) => dispatch(requestFriends(screenName)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
