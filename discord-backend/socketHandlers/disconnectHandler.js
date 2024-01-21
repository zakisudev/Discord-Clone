const serverStore = require('../config/serverStore');

const disconnectHandler = (socket) => {
  serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
