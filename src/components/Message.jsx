import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { onSnapshot, collection } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext.jsx";

function Message() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  console.log(messages);

  return (
    <div className="messageBlock">
      {messages.map((message) => {
        <div className="chatMessage sender">
          <div className="userInfo">
            <img src={message.photoURL} />
            <span>{message.createdAt}</span>
          </div>
          <div className="message">
            <p>{message.text}</p>
          </div>
        </div>;
      })}
      <div className="chatMessage">
        <div className="userInfo">
          <img src="/friend.png" />
          <span>10:50am</span>
        </div>
        <div className="message">
          <p>
            What
            time?time?time?time?time?time?time?time?time?time?time?time?time?time?time?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
