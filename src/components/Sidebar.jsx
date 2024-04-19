import { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./Navbar.jsx";
import ChannelPreview from "./ChannelPreview.jsx";
import { updateDoc, doc, collection, query, orderBy, onSnapshot, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

function Sidebar({
  selectedChannel,
  setSelectedChannel,
  setSelectedChannelName,
}) {
  const navigate = useNavigate();

  const { channels, fetchChannels } = useAuth();
  const [channelPreviews, setChannelPreviews] = useState([]);

  useEffect(() => {
    fetchChannels();
  }, []);
  
  
  useEffect(() => {
    const bumpRecentChannels = async () => {
      try {
        const previews = await Promise.all(channels.map(async (channel) => {
          const messagesRef = collection(db, "channels", channel.id, "messages");
          const q = query(messagesRef, orderBy("createdAt", "desc"), limit(1));
          const messagesSnapshot = await getDocs(q);
          const messages = messagesSnapshot.docs.map((doc) => doc.data());
          const lastMessage = messages.length > 0 ? messages[0] : null;
          return { ...channel, lastMessage };
        }));
        setChannelPreviews(previews);
      } catch(error) {
        console.error("Error fetching channels:", error);
      }
    }
  
    bumpRecentChannels();
  }, [channels]);
      
  const handleClick = async (channelId) => {
    setSelectedChannel(channelId);
    const clickedChannel = channels.find((channel) => channel.id === channelId);
    if (clickedChannel) {
      setSelectedChannelName(clickedChannel.name);
      navigate("/");
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
        {channels.map((channel) => (
          <ChannelPreview
            onClick={() => handleClick(channel.id)}
            isSelected={selectedChannel === channel.id}
            key={channel.id}
            name={channel.name}
            id={channel.id}
            image={channel.image}
            lastAccessed={channel.lastAccessed}
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
          <Link to="/settings" className="username-link">
          <span className="username">{auth.currentUser.displayName}</span>
          </Link>
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;