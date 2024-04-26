import Sidebar from "../components/Sidebar";
import Setting from "../components/Setting";
import { useChat } from "../contexts/ChatContext";


function Settings() {
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
        <Setting />
      </div>
    </div>
  );
}

export default Settings;
