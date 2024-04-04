import { useState } from "react";
import { db } from "../firebase.js";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext.jsx";
import { CloudLightning } from "react-bootstrap-icons";

function Message({
  sender_id,
  photoURL,
  createdAt,
  text,
  selectedChannel,
  messageId,
  displayName,
}) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [isEdited, setIsEdited] = useState(false);

  // Function to convert timestamp to string
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate(); // Convert Firebase timestamp to Date object
    return date.toLocaleString(undefined, {hour12: true }); // Convert Date object to local string
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  //changes saved during edit
  const handleSave = async () => {
    try {
      const messageDocRef = doc(
        db,
        "channels",
        selectedChannel,
        "messages",
        messageId
      );
      await updateDoc(messageDocRef, {
        text: editedText,
      });
      setIsEditing(false);
      setIsEdited(true);
    } catch (error) {
      console.error("Error editing message: ", error);
    }
  };

  const handleCancel = () => {
    setEditedText(text);
    setIsEditing(false);
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
      if (confirm("Do you want to delete this message?")) {
        await deleteDoc(docRef);
      }
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
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <>
            <p>{text}</p>
            {isEdited && <span className="edited-text">(edited)</span>}
            {/* Render "edited" text if message is edited */}
          </>
        )}
        <div className="messageOption">
          {user.uid === sender_id && (
            <>
              {isEditing ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button onClick={handleEdit}>Edit</button>
              )}
              <button
                onClick={() => {
                  handleDelete(
                    "channels",
                    selectedChannel,
                    "messages",
                    messageId
                  );
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Message;
