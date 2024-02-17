import React, { useState } from "react";
import ChatMenuItem from "./ChatMenuItem";

function Header() {
  const [open, setOpen] = useState(false);
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
          Team Junkies
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
