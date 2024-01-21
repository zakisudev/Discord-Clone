import { useEffect } from 'react';
import Messages from './Messages';
import NewMessageInput from './NewMessageInput';
import { getDirectChatHistory } from '../webRTC/socketConnection';
import { connect } from 'react-redux';

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChatHistory({ receiverUserId: chosenChatDetails?.friend?._id });
  }, [chosenChatDetails]);

  return (
    <>
      <div className="flex flex-col justify-end flex-grow w-full">
        <Messages />
        <NewMessageInput />
      </div>
    </>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(MessengerContent);
