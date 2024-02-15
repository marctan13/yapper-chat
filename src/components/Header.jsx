import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

function Header() {
  return (
    <div className="header">
      <div className="chatAvatar">
        <img className="chatLogo" src="/cup.jpg" />
      </div>
      <div className="teamInfo">
        <h1>Team Junkies</h1>
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
