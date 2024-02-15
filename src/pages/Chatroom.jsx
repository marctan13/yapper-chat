import React from "react";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";
import { auth } from "../firebase";

function Chatroom() {
  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar />
        <Chats />
      </div>
    </div>
  );
}

export default Chatroom;
