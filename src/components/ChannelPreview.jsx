import { Trash } from "react-bootstrap-icons";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function ChannelPreview(props) {
  //delete channel
  const handleDelete = async (parentCollection, channelId) => {
    try {
      const docRef = doc(db, parentCollection, channelId);
      await deleteDoc(docRef);
      console.log("successful");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <div className={`chatPreview ${props.isSelected ? "selected" : ""}`}>
      <div className="userChat">
        <img src="/cup.jpg" alt="avatar" />
        <div className="name-chat" onClick={() => props.onClick(props.id)}>
          <h3>{props.name}</h3>
        </div>
        <span>
          <Trash
            onClick={() => handleDelete("channels", props.selectedChannel)}
            style={{ height: "100%" }}
            size={35}
          />
        </span>
      </div>
    </div>
  );
}

export default ChannelPreview;
