import store from './../store/store';
import { setMessages } from '../store/actions/chatActions';

const updateDirectChatHistoryIfActive = (data) => {
  const { members, messages } = data;

  const receiverId = store.getState().chat?.chosenChatDetails?.friend._id;
  const userId = store.getState().auth.userInfo._id;

  if (receiverId && userId) {
    const usersInConversation = [receiverId, userId];

    updateChatHistoryOfSameConversation({
      messages,
      usersInConversation,
      members,
    });
  }
};

const updateChatHistoryOfSameConversation = ({
  messages,
  usersInConversation,
  members,
}) => {
  const result = members.every((memberId) => {
    return usersInConversation.includes(memberId);
  });

  if (result) {
    store.dispatch(setMessages(messages));
  }
};

export default updateDirectChatHistoryIfActive;
