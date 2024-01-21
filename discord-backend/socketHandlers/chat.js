const Conversation = require('../models/conversation');
const serverStore = require('../config/serverStore');

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  try {
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'messages',
      model: 'Message',
      populate: {
        path: 'authorId',
        model: 'User',
        select: 'username _id',
      },
    });

    if (conversation) {
      const io = serverStore.getSocketServerInstance();

      if (toSpecifiedSocketId) {
        io.to(toSpecifiedSocketId).emit('direct-chat-history', {
          messages: conversation.messages,
          members: conversation.members,
        });
      }

      conversation.members.forEach((memberId) => {
        const activeConnections = serverStore.getActiveConnections(
          memberId.toString()
        );

        if (activeConnections) {
          io.to(
            activeConnections.filter((id) => id !== toSpecifiedSocketId)
          ).emit('direct-chat-history', {
            messages: conversation.messages,
            members: conversation.members,
            conversationId: conversation._id,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateChatHistory;
