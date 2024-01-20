import PendingInvitationListItem from './PendingInvitationListItem';

const PendingInvitationsList = () => {
  const DUMMY = [
    {
      id: 1,
      sender: {
        username: 'John Doe',
        email: 'john@g.com',
      },
    },
    {
      id: 2,
      sender: {
        username: 'Jane Smith',
        email: 'jane@e.com',
      },
    },
    {
      id: 3,
      sender: {
        username: 'Smith Dan',
        email: 'smith@e.com',
      },
    },
  ];
  return (
    <div className="flex-grow w-full h-[22%] flex flex-col items-center overflow-auto">
      {DUMMY.map((invitation) => (
        <PendingInvitationListItem
          key={invitation.id}
          invitation={invitation}
        />
      ))}
    </div>
  );
};

export default PendingInvitationsList;
