const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  // sender: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  // receiver: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  type: {
    type: String,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
