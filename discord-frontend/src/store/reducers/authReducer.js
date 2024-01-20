import { authActions } from '../actions/authActions';

const initialState = {
  userInfo: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
