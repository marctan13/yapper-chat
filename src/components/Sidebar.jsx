import { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./Navbar.jsx";
import ChannelPreview from "./ChannelPreview.jsx";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Sidebar({ selectedChannel, setSelectedChannel, setSelectedChannelName }) {
  const navigate = useNavigate();

  const [channels, setChannels] = useState([]);

  useEffect(() => {
    fetchChannels();
  }, []);

  async function fetchChannels() {
    try {
      const channelsCollection = collection(db, "channels");
      const querySnapshot = await getDocs(channelsCollection);
      const channelsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChannels(channelsData);
    } catch (error) {
      console.error("Error fetching channels: ", error);
    }
  }

  const handleClick = async (channelId) => {
    setSelectedChannel(channelId); // Update selectedChannel state with the channelId
    const clickedChannel = channels.find(channel => channel.id === channelId);
    if (clickedChannel) {
      setSelectedChannelName(clickedChannel.name);
      
      try {
        const channelRef = doc(db, "channels", channelId);
        await updateDoc(channelRef, { lastAccessed: new Date() });
      } catch (error) {
        console.error("Error updating last accessed timestamp:", error);
      }
    }
  };

  return (
    <div className="sidebar">
      <Navbar />
      <div className="previews">
        {channels.map(channel => (
          <ChannelPreview
            onClick={() => handleClick(channel.id)} // Pass the channel id to handleClick
            isSelected={selectedChannel === channel.id} // Compare with channel id
            key={channel.id}
            name={channel.name}
            id={channel.id}
            image={channel.image}
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