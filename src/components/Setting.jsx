import React from "react";
import { auth } from "../firebase.js";

function Setting() {
  return (
    <div className="rightSection">
      <div className="header">
        <h1>Settings</h1>
      </div>
      <div className="settingsWrapper">
        <div className="username">
          <img
            src={
              auth.currentUser.photoURL ? auth.currentUser.photoURL : "cup.jpg"
            }
          />
          <div className="username">
            <h1>{auth.currentUser.displayName}</h1>
            <span>{auth.currentUser.email}</span>
            <button className="editAccount">Edit Account</button>
          </div>
        </div>
        <div className="changePassword">
          <h1>Password</h1>
          <button>Change Password</button>
        </div>
        <div className="notifications">
          <h1>Notifications</h1>
          <span>Do Not Disturb</span>
          <input type="checkbox" name="dnd" id="dnd" />
          <label htmlFor="dnd">Do Not Disturb</label>
        </div>
      </div>
    </div>
  );
}

export default Setting;
