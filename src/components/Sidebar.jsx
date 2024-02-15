import React from "react";
import SignOut from "./SignOut";
import { auth } from "../firebase.js";
import "bulma/css/bulma.css";
import Preview from "./Preview.jsx";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="nav-title">
        <span className="logo">🗣️</span>
        <span className="title">Yapper Chat</span>
      </div>

      {/* Chat previews */}
      <div className="preview">
        <div className="toggle">
          <span className="toggle-label">DMs</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <span className="toggle-label">Channel</span>
        </div>
        <button className="newChat">+ Create new Message</button>
        <Preview />
        <Preview />
        <Preview />
        <Preview />
        <Preview />
      </div>

      <div className="user">
        <Link to="/settings">
          <img className="userAvatar" src="/cup.jpg" />
        </Link>
        {/* <img src={auth.currentUser.photoURL} alt="" />
        <span>{auth.currentUser.displayName}</span> */}
        <SignOut />
      </div>
      <div className="chats"></div>
    </div>
  );
}

export default Sidebar;
