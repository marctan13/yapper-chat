import Header from "./Header";
import ChatMessage from "./ChatMessage";

function Chats({ selectedChannel, setSelectedChannel, selectedChannelName, setSelectedChannelName, isChannel,setIsChannel}) {
  return (
    <div className="rightSection">
      <Header
        selectedChannel={selectedChannel}
        selectedChannelName={selectedChannelName}
        setSelectedChannel = {setSelectedChannel}
        setSelectedChannelName={setSelectedChannelName}
        isChannel={isChannel}
        setIsChannel={setIsChannel}
      />
      <ChatMessage
        selectedChannel={selectedChannel}
        selectedChannelName={selectedChannelName}
      />
    </div>
  );
}

export default Chats;
