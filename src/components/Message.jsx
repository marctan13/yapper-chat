import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "../contexts/AuthContext.jsx";

function Message({ createdAt, text, timestamp, selectedChannel, messageId }) {
  const { user } = useAuth();

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
      await deleteDoc(docRef);

      console.log("Subdocument successfully deleted.");
    } catch (error) {
      console.error("Error deleting subdocument:", error);
    }
  }

  return (
    <div className="chatMessage sender">
      <div className="userInfo">
        <img src="/friend.png" />
        <span>10:50pm</span>
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
