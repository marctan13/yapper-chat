import { Trash } from "react-bootstrap-icons";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

function ChannelPreview(props) {
  // const handleDelete = async (channelId) => {
  //   try {
  //     await deleteDoc(doc, (db, "channels", channelId));
  //     console.log("successful")
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };
  return (
    <div className={`chatPreview ${props.isSelected ? "selected" : ""}`}>
      <div className="userChat">
        <img src="/avatar.png" alt="avatar" />
        <div
          className="name-chat"
          onClick={() => props.onClick(props.id)}
        >
          <h3>{props.name}</h3>
        </div>
        <span>
          <Trash
            // onClick={() => handleDelete(props.selectedChannel)}
            style={{ height: "100%" }}
            size={35}
          />
        </span>
      </div>
    </div>
  );
}

export default ChannelPreview;
