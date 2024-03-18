// import { useState } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./SideBar/Navbar.jsx";
import ChannelPreview from "./SideBar/ChannelPreview.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
// import DmPreview from './Sidebar/DmPreview.jsx'

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  //*SETS SIDEBAR PREVIEW TO DM OR CHANNEL*
  // const [showChannelPreview, setShowChannelPreview] = useState(true)

  // const togglePreview = () => {
  //   setShowChannelPreview(prevState => !prevState)
  // }

  return (
    <div className="sidebar">
      <Navbar />
      {/* <section> */}
      {/*To switch between gc and private dm*/}
      {/* {showChannelPreview ? <ChannelPreview /> : <DmPreview />} */}
      {/* </section> */}
      {/*temp preview placement for layout*/}
      <div className="previews">
        <ChannelPreview />
        <ChannelPreview />
        <ChannelPreview />
        <ChannelPreview />
        <ChannelPreview />
      </div>
      {/* <hr /> */}
      <div className="footer">
        <div className="user">
          {/* <img className="userAvatar" src={"/cup.jpg"} /> */}
          <img
            onClick={() => navigate("/settings")}
            src={user.photoURL ? user.photoURL : "avatar.png"}
            alt=""
          />
          <SignOut />
        </div>
        {/* <div className="chats"></div> */}
      </div>
    </div>
  );
}

export default Sidebar;
