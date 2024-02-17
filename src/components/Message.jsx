import React from "react";

function Message(props) {
  return (
    <>
      <div className="chatMessage sender">
        <div className="userInfo">
          <img src={"/avatar.png"} />
          <span>10:52pm</span>
        </div>
        <div className="message">
          <p>{props.text}</p>
        </div>
      </div>
      <div className="chatMessage">
        <div className="userInfo">
          <img src="/friend.png" />
          <span>10:54pm</span>
        </div>
        <div className="message">
          <p>
            What
            time?time?time?time?time?time?time?time?time?time?time?time?time?time?time?
          </p>
        </div>
      </div>
    </>
  );
}

export default Message;
