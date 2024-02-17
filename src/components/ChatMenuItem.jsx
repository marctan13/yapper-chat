import React from "react";

function ChatMenuItem(props) {
  return (
  <li className="dropdownItem">
    <a>{props.text}</a>
  </li>
  );
}

export default ChatMenuItem;
