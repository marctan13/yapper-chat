import { useNavigate } from "react-router-dom";

function SideNavbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-title">
        <span className="logo" onClick={() => navigate("/")}> 🗣️ </span>
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
        <button className="newMsg" onClick={() => navigate("/NewChat")}>
          + Create New Channel
        </button>
      </div>
      <div className="newFriend">
        <button className="AddFriend" onClick={() => navigate("/SearchUser")}>
          + Add Friend
        </button>
      </div>
    </div>
  );
}

export default SideNavbar;
