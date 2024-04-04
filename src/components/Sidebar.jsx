import { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./Navbar.jsx";
import ChannelPreview from "./ChannelPreview.jsx";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext.jsx";

function Sidebar({
  selectedChannel,
  setSelectedChannel,
  setSelectedChannelName,
}) {
  const navigate = useNavigate();

  const { channels, fetchChannels } = useAuth();

  useEffect(() => {
    fetchChannels();
  }, []);

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
