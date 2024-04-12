import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";

function Chatroom() {
  const [selectedChannel, setSelectedChannel] = useState("null");
  const [selectedChannelName, setSelectedChannelName] = useState("");
  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedChannelName={selectedChannelName}
          setSelectedChannelName={setSelectedChannelName}
        />
        <Chats
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedChannelName={selectedChannelName}
          setSelectedChannelName={setSelectedChannelName}
        />
      </div>
    </div>
  );
}

export default Chatroom;
