const Conversation = require('../models/conversation');
const updateChatHistory = require('./chat');

const directChatHistoryHandler = async (socket, data) => {
  try {
    const { user } = socket.user;
    const { receiverUserId } = data;

    const conversation = await Conversation.findOne({
      members: {
        $all: [user?._id, receiverUserId],
      },
      // type: 'DIRECT',
    });

    if (conversation) {
      updateChatHistory(conversation._id.toString(), socket.id);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = directChatHistoryHandler;
