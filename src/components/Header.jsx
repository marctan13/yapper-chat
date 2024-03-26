import React, { useState } from "react";
import ChatMenuItem from "./ChatMenuItem";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";

function Header({ selectedChannel, selectedChannelName }) {
  const [open, setOpen] = useState(false);

  const query = collection(db, "channels");
  const [docs, loading, error] = useCollectionData(query);
  console.log(selectedChannelName);

  return (
    <div className="header">
      <div className="chatAvatar">
        <img className="chatLogo" src="/cup.jpg" />
      </div>
      <div className="teamInfo">
        <h1
          onClick={() => {
            setOpen(!open);
          }}
        >
          {selectedChannelName}
        </h1>
        <div className={`dropdown-menu  ${open ? "active" : "inactive"}`}>
          <h3>Chat Menu</h3>
          <ul>
            <ChatMenuItem text="Chat Members" />
            <ChatMenuItem text="Add Members" />
            <ChatMenuItem text="Mute" />
            <ChatMenuItem text="Leave Channel" />
          </ul>
        </div>
        <div className="teamImg">
          <img className="memberImg" src="/cup.jpg" />
          <img className="memberImg" src="/cup.jpg" />
          <img className="memberImg" src="/cup.jpg" />
          <img className="memberImg" src="/cup.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Header;
