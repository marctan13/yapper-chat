import { useContext } from "react";
import { Trash } from "react-bootstrap-icons";
import { db } from "../firebase";
import { doc, getDocs, deleteDoc, collection, query, where, } from "firebase/firestore";
import { ChatContext } from "../contexts/ChatContext";

function ChannelPreview({ channelId, name, selected, onSelect }) {
  const { dispatch } = useContext(ChatContext);

  const handleSelect = () => {
    onSelect(channelId);
    dispatch({ type: "CHANGE_CHANNEL", payload: channelId });
  };

  

  console.log()

  const handleDeleteChannel = async () => {
    try {
      console.log("Deleting channel with ID: ", channelId);
      if (!channelId) {
        console.error("Error: channelId is undefined or null");
        return;
      }
      const messagesQuery = query(collection(db, "channels", channelId, "messages"), where("channelId", "==", channelId));
      const messagesQuerySnapshot = await getDocs(messagesQuery);
      const batch = db.batch();
      messagesQuerySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
  
      await deleteDoc(doc(db, "channels", channelId));
  
      console.log("Channel and messages deleted successfully");
    } catch (error) {
      console.error("Error deleting channel and messages:", error);
    }
  };
  

  return (
    <div className={`chatPreview ${selected ? 'selected' : ''}`} onClick={handleSelect}>
      <div className="userChat">
        <img src="/avatar.png" alt="avatar" />
        <div className="name-chat">
          <h3>{name}</h3>
        </div>
        <span onClick={(e) => { e.stopPropagation(); handleDeleteChannel(); }}>
          <Trash style={{ height: "100%" }} size={35} />
        </span>
      </div>
    </div>
  );
}

export default ChannelPreview;
