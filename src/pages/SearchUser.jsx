import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import { useChat } from "../contexts/ChatContext";


function SearchUser() {
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
          toggleChannel={toggleChannel}
        />
          <Search toggleChannel={toggleChannel} setSelectedChannel={setSelectedChannel} selectedChannel={selectedChannel} isChannelToggle={isChannelToggle} setIsChannelToggle={setIsChannelToggle}/>
      </div>
    </div>
  );
}

export default SearchUser;
