// import { useState } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./SideBar/Navbar.jsx";
import ChannelPreview from "./SideBar/ChannelPreview.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
// import DmPreview from './Sidebar/DmPreview.jsx'

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  //*SETS SIDEBAR PREVIEW TO DM OR CHANNEL*
  // const [showChannelPreview, setShowChannelPreview] = useState(true)

  // const togglePreview = () => {
  //   setShowChannelPreview(prevState => !prevState)
  // }

  const query = collection(db, "channels");
  const [docs, loading, error] = useCollectionData(query);

  docs?.map((doc) => {
    console.log(doc.name);
  });

  return (
    <div className="sidebar">
      <Navbar />
      {/* <section> */}
      {/*To switch between gc and private dm*/}
      {/* {showChannelPreview ? <ChannelPreview /> : <DmPreview />} */}
      {/* </section> */}
      {/*temp preview placement for layout*/}
      <div className="previews">
        {loading && <div>Loading...</div>}
        {docs &&
          docs.map((doc) => <ChannelPreview key={doc.id} name={doc.name} />)}
        {/* <ChannelPreview />
        <ChannelPreview />
        <ChannelPreview />
        <ChannelPreview />
        <ChannelPreview /> */}
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
