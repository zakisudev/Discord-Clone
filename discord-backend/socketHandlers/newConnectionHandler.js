const serverStore = require('../config/serverStore');
const { updatePendingRequests, updateFriends } = require('./friends');

const newConnectionHandler = async (socket, _) => {
  const userInfo = socket.user;
  const userId = userInfo?.user?._id;
  const socketId = socket.id;

  serverStore.addNewConnectedUser({
    socketId,
    userId,
  });

  updatePendingRequests(userId);

  updateFriends(userId);
};

module.exports = newConnectionHandler;
