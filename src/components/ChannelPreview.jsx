//work on going back to "select channel" page after deleting a channel
//work on highlighting channel when it's selected

import { Trash } from "react-bootstrap-icons";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function ChannelPreview(props) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      console.log("deleting channel: ", props.id);
      if (confirm("Do you want to delete this channel?")) {
        const docRef = doc(db, "channels", props.id);
        await deleteDoc(docRef);
        console.log("successful");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div
      onClick={() => props.onClick(props.id)}
      className={`chatPreview ${props.isSelected ? "selected" : ""}`}
    >
      <div className={`userChat ${props.isSelected ? "selectedChannel" : ""}`}>
        {props.image && (
          <img src={props.image} className="channel-icon" alt="avatar" />
        )}
        {!props.image && (
          <img src="/cup.jpg" className="channel-icon" alt="avatar" />
        )}
        <div className="name-chat">
          <h3>{props.name}</h3>
        </div>
        <span className="deleteContainer">
          <Trash
            onClick={handleDelete} // Use handleDelete directly
            style={{ height: "100%" }}
            size={35}
          />
        </span>
      </div>
    </div>
  );
}

export default ChannelPreview;
