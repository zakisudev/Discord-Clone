import { friendsActions } from '../actions/friendsActions';

const initialState = {
  friends: [],
  friendRequests: [],
  onlineFriends: [],
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case friendsActions.SET_FRIENDS:
      return {
        ...state,
        friends: action.payload,
      };
    case friendsActions.SET_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: action.payload,
      };
    case friendsActions.SET_ONLINE_FRIENDS:
      return {
        ...state,
        onlineFriends: action.payload,
      };
    case friendsActions.RESET_FRIENDS:
      return initialState;

    default:
      return state;
  }
};

export default friendsReducer;
