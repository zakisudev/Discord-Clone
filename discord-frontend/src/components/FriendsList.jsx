import FriendListItem from './FriendListItem';
import { connect } from 'react-redux';

const checkOnlineFriends = (friends = [], onlineFriends = []) => {
  return friends?.map((friend) => {
    return {
      ...friend,
      status: onlineFriends.find((fr) => fr.userId === friend._id)
        ? 'online'
        : 'offline',
    };
  });
};

const FriendsList = ({ friends, onlineFriends }) => {
  return (
    <div className="flex-grow w-full h-full">
      <div className="flex flex-col items-center overflow-auto">
        {checkOnlineFriends(friends, onlineFriends)?.map((friend, index) => (
          <FriendListItem friend={friend} key={index} />
        ))}
      </div>
    </div>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(FriendsList);
