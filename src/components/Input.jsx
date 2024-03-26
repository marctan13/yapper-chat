import React, { useState, useRef } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

function Input({ selectedChannel, formValue, setFormValue }) {
  const messageRef = useRef();
  const { user } = useAuth();


  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await addDoc(
        collection(db, "channels", selectedChannel, "messages"),
        {
          sender_id: user.uid,
          text: formValue,
          photoURL: user.photoURL, //change to correct user photo
          createdAt: serverTimestamp(),
        }
      );
      setFormValue("");
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log("Failed to send");
    }
  };

  return (
    <div className="inputMessage">
      <span ref={messageRef}></span>
      <form className="inputBox" onSubmit={sendMessage}>
        <input
          className="textBox"
          placeholder="Type Message here..."
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button className="send">Send</button>
      </form>
    </div>
  );
}

export default Input;
