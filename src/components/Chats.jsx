import Header from "./Header";
import ChatMessage from "./ChatMessage";

function Chats({ selectedChannel, selectedChannelName }) {
  return (
    <div className="rightSection">
      <Header selectedChannel={selectedChannel} selectedChannelName={selectedChannelName}/>
      <ChatMessage selectedChannel={selectedChannel} selectedChannelName={selectedChannelName} />
    </div>
  );
}

export default Chats;
