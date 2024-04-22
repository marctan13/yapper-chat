import { createContext, useReducer, useContext, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
}

export const ChatContextProvider = ({ children, selectedChannel, setSelectedChannel, isChannelToggle, setIsChannelToggle }) => {
  const { user: currentUser } = useAuth(); // Fix useContext usage here
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const toggleChannel = () => {
    setIsChannelToggle((prev) => !prev);
  };


  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch, selectedChannel, setSelectedChannel, toggleChannel, isChannelToggle, setIsChannelToggle }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
