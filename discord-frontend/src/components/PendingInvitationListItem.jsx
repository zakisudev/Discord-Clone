import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const PendingInvitationListItem = ({ invitation }) => {
  const handleAcceptInvitation = async () => {
    console.log('Accept invitation');
  };

  const handleDeclineInvitation = async () => {
    console.log('Decline invitation');
  };

  return (
    <>
      <div className="flex items-center justify-between w-full bg-gray-400 px-3 my-1">
        <div className="flex items-center">
          <div className="mr-4">{invitation?.sender?.username}</div>
        </div>

        <div className="flex items-center justify-center gap-1">
          <button
            onClick={handleAcceptInvitation}
            className="bg-green-500 text-white"
          >
            <DoneIcon />
          </button>
          <button
            onClick={handleDeclineInvitation}
            className="bg-red-500 text-white"
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default PendingInvitationListItem;
