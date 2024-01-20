import AddFriendButton from '../../components/AddFriendButton';
import FriendsList from '../../components/FriendsList';
import FriendsTitle from '../../components/FriendsTitle';
import PendingInvitationsList from '../../components/PendingInvitationsList';

const FriendsSideBar = () => {
  return (
    <div className="w-[224px] h-screen flex flex-col items-center bg-gray-700">
      <AddFriendButton />
      <FriendsTitle title="Private Messages" />
      <FriendsList />
      <FriendsTitle title="Invitations" />
      <PendingInvitationsList />
    </div>
  );
};

export default FriendsSideBar;
