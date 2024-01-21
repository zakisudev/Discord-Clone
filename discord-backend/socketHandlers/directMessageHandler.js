const Conversation = require('../models/conversation');
const Message = require('../models/message.js');
const updateChatHistory = require('./chat');

const directMessageHandler = async (socket, data) => {
  try {
    const { content, receiverUserId } = data;
    const { user } = socket.user;

    if (!content || !receiverUserId) {
      throw new Error('message or receiverSocketId is missing');
    }

    const message = await Message.create({
      content,
      authorId: user?._id,
      date: new Date(),
      type: 'DIRECT',
    });

    const conversation = await Conversation.findOne({
      members: {
        $all: [user?._id, receiverUserId],
      },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      //update TODO
      updateChatHistory(conversation._id.toString());
    } else {
      const newConversation = await Conversation.create({
        members: [user?._id, receiverUserId],
        messages: [message._id],
      });

      // update TODO
      updateChatHistory(newConversation._id.toString());
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = directMessageHandler;
