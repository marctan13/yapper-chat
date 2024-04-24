import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";
import { useChat } from "../contexts/ChatContext";

function Chatroom() {
  // const [selectedChannel, setSelectedChannel] = useState("null");
  const [selectedChannelName, setSelectedChannelName] = useState("");
  const[isChannelToggle, setIsChannelToggle] = useState(true);
  const{selectedChannel, setSelectedChannel} = useChat();

  const toggleChannel = () => {
    setIsChannelToggle(prev => !prev);
  }
  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedChannelName={selectedChannelName}
          setSelectedChannelName={setSelectedChannelName}
          isChannelToggle={isChannelToggle}
          toggleChannel={toggleChannel} 
          // className="col-md-3 min-vw-30 sidebar-col"
        />
        <Chats
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedChannelName={selectedChannelName}
          setSelectedChannelName={setSelectedChannelName}
          // className="col-8 position-sticky"
        />
      </div>
    </div>
  );
}

export default Chatroom;
