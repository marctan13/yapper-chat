import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { onSnapshot, collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuth } from "../contexts/AuthContext.jsx";

function Message(props, { timestamp }) {
  const { user } = useAuth();

  // function formatTimestamp(timestamp) {
  //   const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
  //   return date.toLocaleString(); // Format Date object into a string
  // }
  // const formattedTimestamp = formatTimestamp(timestamp);

  // function formatTimestamp(timestamp) {
  //   const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object

  //   // Extract date components
  //   const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns zero-based month
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const year = String(date.getFullYear()).slice(2); // Get last two digits of the year

  //   // Extract time components
  //   const hours = String(date.getHours()).padStart(2, "0");
  //   const minutes = String(date.getMinutes()).padStart(2, "0");

  //   // Combine date and time components into desired format
  //   const formattedTimestamp = `${month}/${day}/${year} ${hours}:${minutes}`;

  //   return formattedTimestamp;
  // }

  // const formattedTimestamp = formatTimestamp(timestamp);

    // console.log(props.createdAt.toDate());
    // console.log(props.createdAt.getHours());
    // console.log(props.createdAt.getMinutes());

    return(
      <div className="messageBlock">
        <div className="chatMessage sender">
          <div className="userInfo">
            <img src="/friend.png" />
            <span>10:50pm</span>
          </div>
          <div className="message">
            <p>{props.text}</p>
          </div>
        </div>
      </div>
    );
}

export default Message;
