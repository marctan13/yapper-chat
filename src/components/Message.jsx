import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "../contexts/AuthContext.jsx";

function Message({ createdAt, text, selectedChannel, messageId }) {
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

  console.log(createdAt.toDate());
  // console.log(props.createdAt.getHours());
  // console.log(props.createdAt.getMinutes());

  return (
    <div className="messageBlock">
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
                handleDelete(
                  "channels",
                  selectedChannel,
                  "messages",
                  messageId
                );
              }}
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
