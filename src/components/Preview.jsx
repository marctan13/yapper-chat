import React from "react";
import { Trash } from "react-bootstrap-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Preview() {
  return (
    <div className="chatPreview">
      <div className="userChat">
        <img src="/avatar.png" alt="avatar" />
        <div className="name-chat">
          <h3 className="name">Team Junkies</h3>
          <p>Message Preview Message Preview Message Preview </p>
        </div>
        <span>
          <Trash style={{ height: "100%" }} size={35} />
        </span>
      </div>
    </div>
  );
}

export default Preview;
