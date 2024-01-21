import { openAlertMessage } from './alertActions';
import * as api from '../../services/apis';

export const friendsActions = {
  SET_FRIENDS: 'FRIENDS.SET_FRIENDS',
  SET_FRIEND_REQUESTS: 'FRIENDS.SET_FRIEND_REQUESTS',
  SET_ONLINE_FRIENDS: 'FRIENDS.SET_ONLINE_FRIENDS',
  RESET_FRIENDS: 'FRIENDS.RESET_FRIENDS',
};

export const getActions = (dispatch) => {
  return {
    sendFriendRequests: (data, handleCloseDialog) => {
      dispatch(sendFriendRequests(data, handleCloseDialog));
    },

    acceptFriendRequest: (data) => dispatch(acceptFriendRequest(data)),
    rejectFriendRequest: (data) => dispatch(rejectFriendRequest(data)),

    setOnlineFriends: (onlineFriends) => {
      dispatch({
        type: friendsActions.SET_ONLINE_FRIENDS,
        payload: onlineFriends,
      });
    },
  };
};

export const setPendingFriendRequests = (data) => {
  return {
    type: friendsActions.SET_FRIEND_REQUESTS,
    payload: data,
  };
};

export const setFriends = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    payload: friends,
  };
};

export const sendFriendRequests = (data, handleCloseDialog) => {
  return async (dispatch) => {
    const res = await api.sendFriendRequests(data, handleCloseDialog);
    if (!res || res?.status === false) {
      dispatch(openAlertMessage(res?.message));
      return;
    } else {
      dispatch(openAlertMessage('Friend request sent'));
      handleCloseDialog();
    }
  };
};

export const acceptFriendRequest = (data) => {
  return async (dispatch) => {
    const res = await api.acceptFriendRequest(data);
    if (!res || res?.status === false) {
      dispatch(openAlertMessage(res?.message));
      return;
    } else {
      dispatch(openAlertMessage('Friend accepted'));
    }
  };
};

export const rejectFriendRequest = (data) => {
  return async (dispatch) => {
    const res = await api.rejectFriendRequest(data);
    if (!res || res?.status === false) {
      dispatch(openAlertMessage(res?.message));
      return;
    } else {
      dispatch(openAlertMessage('Friend rejected'));
    }
  };
};

export const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendsActions.SET_ONLINE_FRIENDS,
    payload: onlineUsers,
  };
};

export const resetFriends = () => {
  return {
    type: friendsActions.RESET_FRIENDS,
  };
};
