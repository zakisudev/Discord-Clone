// import { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import MessagesHeader from './MessagesHeader';
import { format } from 'date-fns';
import Message from './Message';

const convertDate = (date, format) => {
  const map = {
    MM: date.getMinutes(),
    HH: date.getHours(),
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };

  return format.replace(/mm|dd|yy|yyy|HH|MM/gi, (matched) => map[matched]);
};

const Messages = ({ chosenChatDetails, messages }) => {
  return (
    <>
      <div className="flex max-h-[calc(100%-50px)] justify-start flex-col items-center overflow-auto">
        <MessagesHeader name={chosenChatDetails?.friend?.username} />
        {messages.map((message, index) => {
          const sameAuthor =
            index > 0 &&
            messages[index].authorId._id === messages[index - 1].authorId._id;

          const sameDay =
            index > 0 &&
            convertDate(new Date(message.date), 'dd/mm/yy') ===
              convertDate(new Date(messages[index - 1].date), 'dd/mm/yy');

          return (
            <div
              key={index}
              className="flex flex-col justify-center items-end w-full"
            >
              {(!sameDay || index === 0) && (
                <div className="flex justify-center items-center mx-auto">
                  <div className="bg-gray-700 text-gray-400 rounded-full max-w-fit px-3 py-1 flex justify-center items-center">
                    <p className="text-xs">
                      {format(new Date(message?.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              )}
              <Message
                key={message._id}
                content={message.content}
                sameAuthor={sameAuthor}
                date={message.date}
                sameDay={sameDay}
                authorId={message.authorId?._id}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(Messages);
