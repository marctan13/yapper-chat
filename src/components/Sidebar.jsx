import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./Navbar.jsx";
import ChannelPreview from "./ChannelPreview.jsx";

function Sidebar() {

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
            }
          />
          <SignOut/>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
