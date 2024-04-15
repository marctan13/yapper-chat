import Header from "./Header";
import ChatMessage from "./ChatMessage";

function Chats({ selectedChannel, setSelectedChannel, selectedChannelName, setSelectedChannelName }) {
  return (
    <div className="rightSection">
      <Header
        selectedChannel={selectedChannel}
        selectedChannelName={selectedChannelName}
        setSelectedChannel = {setSelectedChannel}
        setSelectedChannelName={setSelectedChannelName}
      />
      <ChatMessage
        selectedChannel={selectedChannel}
        selectedChannelName={selectedChannelName}
      />
    </div>
  );
}

export default Chats;
