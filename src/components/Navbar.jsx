import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar({isChannelToggle, toggleChannel}) {
  const navigate = useNavigate();
  const {channels} = useAuth();

  return (
    <div className="navbar">
      <div className="nav-title">
        <span className="logo" onClick={() => navigate("/")}> 🗣️ </span>
        <span className="title">Yapper Chat</span>
      </div>
      <div className="toggle">
        <span className="toggle-label">DMs</span>
        <label className="switch">
          <input type="checkbox" checked={isChannelToggle} onChange={toggleChannel}/>
          <span className="slider round"></span>
        </label>
        <span className="toggle-label">Channel</span>
      </div>
      <div className="addBtns">
        <div className="newFriend">
          <button className="AddFriend" onClick={() => navigate("/SearchUser")}>
            + Add Friend
          </button>
        </div>
        <div className="newMsgContainer">
          <button className="newMsg" onClick={() => navigate("/NewChat")}>
            + Create New Channel
          </button>
        </div>
        
      </div>
      
    </div>
  );
}

export default Navbar;
