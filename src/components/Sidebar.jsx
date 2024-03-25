import { auth } from "../firebase.js";
import { useAuth } from "../contexts/AuthContext.jsx"
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./Navbar.jsx";
import ChannelPreview from "./ChannelPreview.jsx";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  const handleChannelSelect = (channelId) => {
    setSelectedChannelId(channelId);
  };

  const query = collection(db, "channels");
  const [docs, loading, error] = useCollectionData(query);

  console.log("Docs: ", docs);

  return (
    <div className="sidebar">
      <Navbar />
      <div className="previews">
        {loading && <div>Loading...</div>}
        {docs &&
          docs.map((doc) => {
            console.log("Document ID:", doc.id);
            return (
              <ChannelPreview
                key={doc.id}
                name={doc.name}
                channelId={doc.id}
                selected={doc.id === selectedChannelId}
                onSelect={handleChannelSelect}
              />
            );
          })}
      </div>
      <div className="footer">
        <div className="user">
          <img
            onClick={() => navigate("/settings")}
            src={
              auth.currentUser.photoURL ? auth.currentUser.photoURL : "cup.jpg"
            }
          />
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;