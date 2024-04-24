import { Trash } from "react-bootstrap-icons";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function ChannelPreview(props) {

  const handleDelete = async () => {
    try {
      console.log("deleting channel: ", props.id);
      if (confirm("Do you want to delete this channel?")) {
        const docRef = doc(db, "channels", props.id);
        await deleteDoc(docRef);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div
      onClick={() => props.onClick(props.id)}
      className={`chatPreview ${
        props.id === props.selectedChannel ? "selected" : ""
      }`}
    >
      <div className={`userChat ${props.id === props.selectedChannel ? "selectedChannel" : ""}`}>
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
