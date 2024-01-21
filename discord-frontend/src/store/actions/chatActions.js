export const chatTypes = {
  DIRECT: 'DIRECT',
  GROUP: 'GROUP',
  CHANNEL: 'CHANNEL',
};

export const chatActions = {
  SET_CHOSEN_CHAT_DETAILS: 'CHAT.SET_CHOSEN_CHAT_DETAILS',
  SET_MESSAGES: 'CHAT.SET_MESSAGES',
  SET_CHAT_TYPE: 'CHAT.SET_CHAT_TYPE',
  // SET_CHAT_NAME : 'CHAT.SET_CHAT_NAME',
  // SET_CHAT_ID : 'CHAT.SET_CHAT_ID',
  // SET_CHAT_MEMBERS : 'CHAT.SET_CHAT_MEMBERS',
  // SET_CHAT_MESSAGES : 'CHAT.SET_CHAT_MESSAGES',
  // SET_CHAT_MESSAGE : 'CHAT.SET_CHAT_MESSAGE',
  RESET_CHAT: 'CHAT.RESET_CHAT',
};

export const getActions = (dispatch) => {
  return {
    setChosenChatDetails: (details, chatType) =>
      dispatch(setChosenChatDetails(details, chatType)),
    // setMessages: (messages) => dispatch(setMessages(messages)),
    // setChatType: (chatType) => dispatch(setChatType(chatType)),
    // setChatName : (chatName) => dispatch(setChatName(chatName)),
    // setChatId : (chatId) => dispatch(setChatId(chatId)),
    // setChatMembers : (chatMembers) => dispatch(setChatMembers(chatMembers)),
    // setChatMessages : (chatMessages) => dispatch(setChatMessages(chatMessages)),
    // setChatMessage : (chatMessage) => dispatch(setChatMessage(chatMessage)),
    // resetChat: () => dispatch(resetChat()),
  };
};

export const setChosenChatDetails = (details, chatType) => {
  return {
    type: chatActions.SET_CHOSEN_CHAT_DETAILS,
    payload: { details, chatType },
  };
};

export const setMessages = (messages) => {
  return {
    type: chatActions.SET_MESSAGES,
    payload: messages,
  };
};
