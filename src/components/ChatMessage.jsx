import React from "react";
import Input from "./Input";
import Message from "./Message";

function ChatMessage() {
  return (
    <>
      <div className="chatMessages">
        <Message />
        <Input />
      </div>
    </>
  );
}

export default ChatMessage;
