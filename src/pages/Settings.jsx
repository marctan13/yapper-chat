import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Setting from "../components/Setting";
import { useChat } from "../contexts/ChatContext";


function Settings() {
  // const [selectedChannel, setSelectedChannel] = useState("null");
  const [selectedChannelName, setSelectedChannelName] = useState("");
  const [isChannelToggle, setIsChannelToggle] = useState(true);
  const{selectedChannel, setSelectedChannel} = useChat();


  const toggleChannel = () => {
    setIsChannelToggle((prev) => !prev);
  };

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
        />
        <Setting />
      </div>
    </div>
  );
}

export default Settings;
