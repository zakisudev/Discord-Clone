import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { connect } from 'react-redux';
import { sendDirectMessage } from '../webRTC/socketConnection';

const NewMessageInput = ({ chosenChatDetails }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!message) return;
    try {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.friend._id,
        content: message,
      });

      setMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full rounded-sm bg-gray-700">
      <input
        type="text"
        placeholder="Write a message"
        className="flex-grow rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2 bg-gray-300 ml-2 mr-2 my-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="flex justify-center items-center bg-blue-500 rounded-full p-2 mr-1 h-fit my-auto"
        onClick={handleSendMessage}
      >
        <SendIcon />
      </button>
    </div>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(NewMessageInput);
