import { useNavigate } from "react-router-dom";

function SideNavbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="nav-title">
        <span className="logo"> 🗣️ </span>
        <span className="title">Yapper Chat</span>
      </div>
      
      <div className="newMsgContainer">
        <button 
          className="newMsg" 
          onClick={() => navigate("/NewChat")}>
          + Create New Message
        </button>
      </div>
    </div>
  );
}

export default SideNavbar