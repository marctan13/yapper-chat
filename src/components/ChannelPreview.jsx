import { Trash } from "react-bootstrap-icons";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function ChannelPreview(props) {
  const navigate = useNavigate();

  const handleDelete = async (parentCollection, channelId) => {
    try {
      if (confirm("Do you want to delete this channel?")) {
        const docRef = doc(db, parentCollection, channelId);
        await deleteDoc(docRef);
        console.log("successful");
        navigate("/settings");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  //work on going back to "select channel" page after deleting a channel
  //work on highlighting channel when it's selected

  return (
    <div className={`chatPreview ${props.isSelected ? "selected" : ""}`}>
      <div className={`userChat ${props.isSelected ? "selectedChannel" : ""}`}>
        {props.image && <img src={props.image} alt="avatar" />} {/* Display channel image if available */}
        {!props.image && <img src="/cup.jpg" alt="avatar" />} {/* Display default image if channel image is not available */}
        <div className="name-chat" onClick={() => props.onClick(props.id)}>
          <h3>{props.name}</h3>
        </div>
        <span className="deleteContainer">
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
