import { auth } from "../firebase.js";
import { useAuth } from "../contexts/AuthContext.jsx"
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./Navbar.jsx";
import ChannelPreview from "./ChannelPreview.jsx";

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <Navbar />
      <div className="previews">
        <ChannelPreview />
        <ChannelPreview />
      </div>
      <div className="footer">
        <div className="user">
          <img
            onClick={() => navigate("/settings")}
            src={
              auth.currentUser.photoURL ? auth.currentUser.photoURL : "cup.jpg"
              // src={user.photoURL ? user.photoURL : "avatar.png"}
            }
          />
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
