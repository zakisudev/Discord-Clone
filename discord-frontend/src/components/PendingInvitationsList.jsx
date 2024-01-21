import PendingInvitationListItem from './PendingInvitationListItem';
import { connect } from 'react-redux';

const PendingInvitationsList = ({ friendRequests }) => {
  return (
    <div className="flex-grow w-full h-[22%] flex flex-col items-center overflow-auto">
      {friendRequests?.length > 0 &&
        friendRequests?.map((requests, index) => (
          <PendingInvitationListItem key={index} friendRequests={requests} />
        ))}
    </div>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return { ...friends };
};

export default connect(mapStoreStateToProps, null)(PendingInvitationsList);
