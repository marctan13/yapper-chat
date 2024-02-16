// import { useState } from "react";
// import { auth } from "../firebase.js";
import { Link } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from './SideBar/Navbar.jsx'
import ChannelPreview from "./SideBar/ChannelPreview.jsx";
// import DmPreview from './Sidebar/DmPreview.jsx'

function Sidebar() {
  //*SETS SIDEBAR PREVIEW TO DM OR CHANNEL*
  // const [showChannelPreview, setShowChannelPreview] = useState(true)

  // const togglePreview = () => {
  //   setShowChannelPreview(prevState => !prevState)
  // }

  return (
    <div className="sidebar">
      <Navbar />
      <section>
        {/*To switch between gc and private dm*/}
        {/* {showChannelPreview ? <ChannelPreview /> : <DmPreview />} */}
      </section>
      {/*temp preview placement for layout*/}
      <ChannelPreview />
      <ChannelPreview />
      <ChannelPreview />
      <ChannelPreview />
      <div className="footer">
        <div className="user">
          <Link to="/settings">
            <img className="userAvatar" src="/cup.jpg" />
              </Link>
                {/* <img src={auth.currentUser.photoURL} alt="" />
                <span>{auth.currentUser.displayName}</span> */}
                <SignOut />
            </div>
          <div className="chats"></div> 
        </div>
      </div>
  );
}

export default Sidebar;