import FriendListItem from './FriendListItem';

const FriendsList = () => {
  const DUMMY = [
    {
      id: 1,
      name: 'John Doe',
      status: 'online',
    },
    {
      id: 2,
      name: 'Jane Doe',
      status: 'offline',
    },
    {
      id: 3,
      name: 'Smith Doe',
      status: 'offline',
    },
  ];
  return (
    <div className="flex-grow w-full h-full">
      <div className="flex flex-col items-center overflow-auto">
        {DUMMY.map((friend) => (
          <FriendListItem friend={friend} key={friend.id} />
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
