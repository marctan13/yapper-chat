import { db } from "../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext.jsx";
import { CloudLightning } from "react-bootstrap-icons";

function Message({
  sender_id,
  photoURL,
  createdAt,
  text,
  selectedChannel,
  messageId,
  displayName
}) {
  const { user } = useAuth();

  // Function to convert timestamp to string
  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate(); // Convert Firebase timestamp to Date object
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // Set to true to display time in 12-hour format
    };
    return date.toLocaleString(undefined, { hour12: true }); // Convert Date object to local string
  };

  //delete message
  async function handleDelete(
    parentCollection,
    parentDocId,
    subcollection,
    subDocId
  ) {
    try {
      const docRef = doc(
        db,
        parentCollection,
        parentDocId,
        subcollection,
        subDocId
      );

      // Delete the subdocument
      if(confirm("Do you want to delete this message?")) {
        await deleteDoc(docRef);
      }
      
      console.log("Subdocument successfully deleted.");
    } catch (error) {
      console.error("Error deleting subdocument:", error);
    }
  }

  return (
    <div className={`chatMessage ${user.uid === sender_id ? "sender" : ""}`}>
      <div className="userInfo">
        <img src={photoURL} alt={displayName} />
        <span>{formatTimestamp(createdAt)}</span>
      </div>
      <div className="message">
        <p>{text}</p>
        <div className="messageOption">
          <button>edit</button>
          <button
            onClick={() => {
              handleDelete("channels", selectedChannel, "messages", messageId);
            }}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default Message;