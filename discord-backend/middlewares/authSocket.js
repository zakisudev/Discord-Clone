const jwt = require('jsonwebtoken');

const verifySocketToken = (socket, next) => {
  const token = socket.handshake?.auth?.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
  } catch (error) {
    const socketError = new Error('Invalid Token');
    return next(socketError);
  }

  next();
};

module.exports = verifySocketToken;
