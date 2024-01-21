const User = require('../models/userModel');
const FriendRequest = require('../models/friendRequest');
const serverStore = require('../config/serverStore');

const updatePendingRequests = async (userId) => {
  try {
    const onlineFriends = serverStore.getActiveConnections(userId);

    if (onlineFriends?.length > 0) {
      const pendingRequests = await FriendRequest.find({
        receiverId: userId,
      }).populate('senderId', '_id username email');

      if (!pendingRequests) {
        return;
      }

      const io = serverStore.getSocketServerInstance();

      onlineFriends.forEach((receiverSocketId) => {
        io.to(receiverSocketId).emit('friend-request', {
          pendingRequests: pendingRequests ? pendingRequests : [],
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateFriends = async (userId) => {
  try {
    const receiverList = serverStore.getActiveConnections(userId);

    if (receiverList?.length !== 0) {
      const user = await User.findById(userId, {
        _id: 1,
        friends: 1,
      }).populate('friends', '_id username email');

      if (user) {
        const friendsList = user.friends.map((fr) => {
          return {
            _id: fr._id,
            username: fr.username,
            email: fr.email,
          };
        });

        const io = serverStore.getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit('friends-list', {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { updatePendingRequests, updateFriends };
