const MessagesHeader = ({ name }) => {
  return (
    <div className="px-3 py-1 bg-white text-black rounded-lg my-4">
      Beginning of your chat with {name}
    </div>
  );
};

export default MessagesHeader;
