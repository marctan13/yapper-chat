import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import { useChat } from "../contexts/ChatContext";


function SearchUser() {
  const{selectedChannel, setSelectedChannel, toggleChannel, isChannelToggle, setIsChannelToggle} = useChat();

  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar
          isChannelToggle={isChannelToggle}
          toggleChannel={toggleChannel}
          setSelectedChannel={setSelectedChannel}
        />
          <Search toggleChannel={toggleChannel} setSelectedChannel={setSelectedChannel} selectedChannel={selectedChannel} isChannelToggle={isChannelToggle} setIsChannelToggle={setIsChannelToggle}/>
      </div>
    </div>
  );
}

export default SearchUser;
