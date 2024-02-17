import React from "react";
import Input from "./Input";
import Message from "./Message";

function ChatMessage() {
  return (
    <>
      <div className="chatMessages">
        {/* Conversation */}
        <div className="messageBlock">
          <Message text="Want to meet up later?Want to meet up later?Want to meet up later?Want to meet up later?Want to meet up later?" />
          <Message text="Want to meet up later?" />
          <Message text="Want to meet up later?" />
        </div>
        {/* input your message here */}
        <Input />
      </div>
    </>
  );
}

export default ChatMessage;
