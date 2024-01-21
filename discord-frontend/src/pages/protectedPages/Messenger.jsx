import { connect } from 'react-redux';
import WelcomeMessage from '../../components/WelcomeMessage';
import MessengerContent from '../../components/MessengerContent';

const Messenger = ({ chosenChatDetails }) => {
  return (
    <div className="flex-grow bg-gray-500 mt-[48px] flex max-h-screen">
      {!chosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContent chat={chosenChatDetails} />
      )}
    </div>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(Messenger);
