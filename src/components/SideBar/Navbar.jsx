import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <navbar className="navbar">
      <div className="nav-title">
        <span onClick={() => navigate("/")} className="logo">
          🗣️
        </span>
        <span className="title">Yapper Chat</span>
      </div>
      <div className="toggle">
        <span className="toggle-label">DMs</span>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">Channel</span>
      </div>
      <div className="newMsgContainer">
        {/*Work in progress soon*/}
        <button className="newMsg">+ Create New Message</button>
      </div>
    </navbar>
  );
}

export default Navbar;
