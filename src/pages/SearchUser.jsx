import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import { useChat } from "../contexts/ChatContext";


function SearchUser() {
  const [isChannelToggle, setIsChannelToggle] = useState(true);
  // const [selectedChannel, setSelectedChannel] = useState("null");
  const{selectedChannel, setSelectedChannel} = useChat();


  const toggleChannel = () => {
    setIsChannelToggle((prev) => !prev);
  };

  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar
          isChannelToggle={isChannelToggle}
          toggleChannel={toggleChannel}
          setSelectedChannel={setSelectedChannel}
        />
          <Search setSelectedChannel={setSelectedChannel} selectedChannel={selectedChannel}/>
      </div>
    </div>
  );
}

export default SearchUser;
