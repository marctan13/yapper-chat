import { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./Navbar.jsx";
import ChannelPreview from "./ChannelPreview.jsx";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Sidebar({ selectedChannel, setSelectedChannel, setSelectedChannelName }) {
  const navigate = useNavigate();

  const query = collection(db, "channels");
  const [docs, loading, error] = useCollectionData(query);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetchChannelIds();
  }, []);

  async function fetchChannelIds() {
    try {
      const channelsRef = collection(db, "channels");
      const querySnapshot = await getDocs(channelsRef);
      const channelsData = [];
      querySnapshot.forEach((doc) => {
        channelsData.push({ id: doc.id, name: doc.data().name, createdAt: doc.data().createdAt });
      });
      setChannels(channelsData);
    } catch (error) {
      console.error("Error fetching channels: ", error);
    }
  }

  const handleClick = async (channelName) => {
    if (channels.length > 0) {
      const clickedChannel = channels.find(
        (channel) => channel.name === channelName
      );
      if (clickedChannel) {
        setSelectedChannel(clickedChannel.id);
        setSelectedChannelName(clickedChannel.name);
        
        try {
          const channelRef = doc(db, "channels", clickedChannel.id);
          await updateDoc(channelRef, {
            lastAccessed: new Date()  // Update lastAccessed timestamp
          });
        } catch (error) {
          console.error("Error updating last accessed timestamp:", error);
        }
      }
    }
  };  

  return (
    <div className="sidebar">
      <Navbar />
      <div className="previews">
        {loading && <div>Loading...</div>}
        {docs &&
          docs
            .slice()
            .sort((a, b) => (b.lastAccessed || 0) - (a.lastAccessed || 0)) // Sort channels based on lastAccessed timestamp
            .map((doc) => (
              <ChannelPreview
                onClick={() => handleClick(doc.name)}
                isSelected={selectedChannel === doc.id}
                key={doc.id}
                name={doc.name}
                id={doc.id}
                selectedChannel={selectedChannel}
                image={doc.image}
              />
            ))}
      </div>
      <div className="footer">
        <div className="user">
          <img
            onClick={() => navigate("/settings")}
            src={
              auth.currentUser.photoURL
                ? auth.currentUser.photoURL
                : "avatar.png"
            }
          />
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;