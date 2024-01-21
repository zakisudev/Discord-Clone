import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { connect } from 'react-redux';
import { getActions } from './../store/actions/friendsActions';
import { useState } from 'react';

const PendingInvitationListItem = ({
  friendRequests,
  acceptFriendRequest = () => {},
  rejectFriendRequest = () => {},
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleAcceptInvitation = async () => {
    acceptFriendRequest({ id: friendRequests._id });
    setButtonDisabled(true);
  };

  const handleDeclineInvitation = async () => {
    rejectFriendRequest({ id: friendRequests._id });
    setButtonDisabled(true);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full text-white font-bold px-3 my-1">
        <div className="flex items-center">
          <div className="mr-4">{friendRequests?.senderId?.username}</div>
        </div>

        <div className="flex items-center justify-center gap-1">
          <button
            onClick={handleAcceptInvitation}
            className={`bg-green-500 text-white rounded-full ${
              buttonDisabled && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={buttonDisabled}
          >
            <DoneIcon />
          </button>
          <button
            onClick={handleDeclineInvitation}
            className={`bg-red-500 text-white rounded-full ${
              buttonDisabled && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={buttonDisabled}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(PendingInvitationListItem);
