// import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";


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
