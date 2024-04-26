import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";
import { useChat } from "../contexts/ChatContext";

function Chatroom() {
  const [isChannel, setIsChannel] = useState(true);
  const{selectedChannel, setSelectedChannel, toggleChannel, isChannelToggle, setIsChannelToggle, selectedChannelName, setSelectedChannelName} = useChat();

  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedChannelName={selectedChannelName}
          setSelectedChannelName={setSelectedChannelName}
          isChannelToggle={isChannelToggle}
          setIsChannelToggle={setIsChannelToggle}
          toggleChannel={toggleChannel} 
          isChannel={isChannel}
        />
        <Chats
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedChannelName={selectedChannelName}
          setSelectedChannelName={setSelectedChannelName}
          isChannel={isChannel}
          setIsChannel={setIsChannel}
        />
      </div>
    </div>
  );
}

export default Chatroom;
