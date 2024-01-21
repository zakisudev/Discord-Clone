import { chatTypes } from '../store/actions/chatActions';
import { connect } from 'react-redux';
import { getActions } from '../store/actions/chatActions';

const FriendListItem = ({ friend, setChosenChatDetails }) => {
  const handleChooseActiveConversation = () => {
    setChosenChatDetails({ friend }, chatTypes.DIRECT);
  };

  return (
    <>
      <button
        onClick={handleChooseActiveConversation}
        className="flex items-center justify-between w-full h-16 px-2 py-2 bg-gray-600 hover:bg-gray-800 transition-all duration-200 ease-linear"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-4 bg-gray-500 rounded-full">
              {friend.avatar}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white">
                {friend.username}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className={`w-3 h-3 mr-2 ${
                friend.status === 'online' ? 'bg-green-500' : 'bg-red-500'
              } rounded-full`}
            ></div>
          </div>
        </div>
      </button>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(FriendListItem);
