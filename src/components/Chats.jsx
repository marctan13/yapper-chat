import Header from "./Header";
import ChatMessage from "./ChatMessage";

function Chats({ isChannel, setIsChannel }) {
  return (
    <div className="rightSection">
      <Header isChannel={isChannel} setIsChannel={setIsChannel} />
      <ChatMessage />
    </div>
  );
}

export default Chats;
