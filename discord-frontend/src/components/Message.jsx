const Message = ({ authorId, content, sameAuthor, date, sameDay }) => {
  const userInfo = JSON.parse(localStorage.getItem('user'));

  const formattedTime = (time) => {
    const date = new Date(time);
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (hour < 10) {
      hour = `0${hour}`;
    }

    if (minute < 10) {
      minute = `0${minute}`;
    }

    return `${hour}:${minute}`;
  };

  if (sameDay && sameAuthor) {
    return (
      <>
        {authorId === userInfo._id ? (
          <div className="flex items-end mb-4 w-[97%]">
            <div className="flex flex-col">
              <div className="bg-red-200 rounded-lg p-2">
                <p className="text-gray-700 text-sm">{content}</p>
                <div className="flex flex-end text-[8px] text-gray-400 font-bold">
                  {formattedTime(date)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-end mb-4 w-[97%]">
            <div className="flex flex-col w-full">
              <div className="flex items-center self-end">
                <div className="bg-blue-200 rounded-lg p-2 ml-auto">
                  <p className="text-gray-700 text-sm">{content}</p>
                  <div className="flex flex-end text-[8px] text-gray-400 font-bold">
                    {formattedTime(date)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {authorId !== userInfo._id ? (
        <div className="flex items-end mb-4 w-[97%]">
          <div className="flex flex-col">
            <div className="bg-red-200 rounded-lg p-2">
              <p className="text-gray-700 text-sm">{content}</p>
              <div className="flex flex-end text-[8px] text-gray-400 font-bold">
                {formattedTime(date)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-end mb-4 w-[97%]">
          <div className="flex flex-col w-full">
            <div className="flex items-center self-end">
              <div className="bg-blue-200 rounded-lg p-2 ml-auto">
                <p className="text-gray-700 text-sm">{content}</p>
                <div className="flex flex-end text-[8px] text-gray-400 font-bold">
                  {formattedTime(date)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
