import io from 'socket.io-client';
import {
  setFriends,
  setPendingFriendRequests,
  setOnlineUsers,
} from '../store/actions/friendsActions';
import store from './../store/store';
import updateDirectChatHistoryIfActive from './chat';

let socket;

export const connectWithSocketServer = (userInfo) => {
  if (!socket) {
    const jwtToken = userInfo?.token;
    socket = io('http://localhost:5000', {
      auth: {
        token: jwtToken,
      },
    });

    socket.on('connect', () => {
      // console.log(socket.id);
    });

    socket.on('friend-request', (data) => {
      const { pendingRequests } = data;
      store.dispatch(setPendingFriendRequests(pendingRequests));
    });

    socket.on('friends-list', (data) => {
      const { friends } = data;
      store.dispatch(setFriends(friends));
    });

    socket.on('online-users', (data) => {
      const { onlineUsers } = data;
      store.dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on('direct-chat-history', (data) => {
      updateDirectChatHistoryIfActive(data);
    });
  }

  return socket;
};

export const sendDirectMessage = (data) => {
  socket.emit('direct-message', data);
};

export const getDirectChatHistory = (data) => {
  socket.emit('direct-chat-history', data);
};
