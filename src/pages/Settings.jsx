import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Setting from "../components/Setting";
import { useChat } from "../contexts/ChatContext";


function Settings() {
  const [selectedChannelName, setSelectedChannelName] = useState("");
  const{selectedChannel, setSelectedChannel, toggleChannel, isChannelToggle, setIsChannelToggle, members} = useChat();

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
          members={members}
        />
        <Setting />
      </div>
    </div>
  );
}

export default Settings;
