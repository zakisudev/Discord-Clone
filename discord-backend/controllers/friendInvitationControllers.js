const User = require('../models/userModel');
const FriendRequest = require('../models/friendRequest');
const {
  updatePendingRequests,
  updateFriends,
} = require('../socketHandlers/friends');

const postInvite = async (req, res) => {
  const { requestReceiverEmail } = req.body;
  const { user } = req.user;

  const sender = await User.findOne({ _id: user._id }).select('email');

  if (requestReceiverEmail.toLowerCase() === sender?.email?.toLowerCase()) {
    return res.status(400).json({
      status: false,
      message: 'You cannot send friend request to yourself',
    });
  }

  try {
    const receiver = await User.findOne({
      email: requestReceiverEmail.toLowerCase(),
    });
    if (!receiver) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }

    const friendRequest = await FriendRequest.findOne({
      $or: [
        { senderId: user._id, receiverId: receiver._id },
        { senderId: receiver._id, receiverId: user._id },
      ],
    });

    if (friendRequest) {
      return res.status(400).json({
        status: false,
        message: 'Friend request already sent',
      });
    }

    if (receiver.friends.includes(sender._id)) {
      return res.status(400).json({
        status: false,
        message: 'You are already friends',
      });
    }

    const newFriendRequest = await FriendRequest.create({
      senderId: user._id,
      receiverId: receiver._id,
    });

    updatePendingRequests(receiver._id.toString());

    return res.status(201).json({
      status: true,
      message: 'Friend request sent',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
};

const acceptFriendRequest = async (req, res) => {
  const { id } = req.body;
  const { user } = req.user;

  try {
    const friendRequest = await FriendRequest.findOne({
      _id: id,
    });

    if (!friendRequest) {
      return res.status(404).json({
        status: false,
        message: 'Friend request not found',
      });
    }

    const sender = await User.findOne({ _id: friendRequest.senderId });
    const receiver = await User.findOne({ _id: friendRequest.receiverId });

    if (!sender || !receiver) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }

    if (user.friends.includes(receiver._id)) {
      return res.status(400).json({
        status: false,
        message: 'You are already friends',
      });
    }

    sender.friends.push(receiver._id);
    receiver.friends.push(sender._id);

    await sender.save();
    await receiver.save();

    await FriendRequest.findByIdAndDelete(id);

    updateFriends(receiver._id.toString());
    updateFriends(sender._id.toString());
    updatePendingRequests(receiver._id.toString());

    return res.status(200).json({
      status: true,
      message: 'Friend accepted',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
};

const rejectFriendRequest = async (req, res) => {
  const { id } = req.body;
  const { user } = req.user;

  try {
    const friendRequest = await FriendRequest.findOne({
      _id: id,
    });

    if (!friendRequest) {
      return res.status(404).json({
        status: false,
        message: 'Friend request not found',
      });
    }

    const sender = await User.findOne({ _id: friendRequest.senderId });
    const receiver = await User.findOne({ _id: friendRequest.receiverId });

    if (!sender || !receiver) {
      return res.status(404).json({
        status: false,
        message: 'User not found',
      });
    }

    await FriendRequest.findByIdAndDelete(id);

    updatePendingRequests(receiver._id.toString());
    updatePendingRequests(sender._id.toString());

    return res.status(200).json({
      status: true,
      message: 'Friend request rejected',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { postInvite, acceptFriendRequest, rejectFriendRequest };
