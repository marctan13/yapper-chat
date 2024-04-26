import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";

function Chatroom() {
  const [isChannel, setIsChannel] = useState(true);
  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar isChannel={isChannel} />
        <Chats isChannel={isChannel} setIsChannel={setIsChannel} />
      </div>
    </div>
  );
}

export default Chatroom;
