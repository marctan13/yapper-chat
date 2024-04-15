import Header from "./Header";
import ChatMessage from "./ChatMessage";
import { db } from "../firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import Input from "./Input.jsx";
import { useState, useEffect } from "react";

function Chats({ selectedChannel, selectedChannelName }) {

  const [formValue, setFormValue] = useState("");

  return (
    <div className="rightSection">
      <Header 
        selectedChannel={selectedChannel} 
        selectedChannelName={selectedChannelName}
      />
      <ChatMessage 
        selectedChannel={selectedChannel} 
      />
    
    </div>
  );
}

export default Chats;
