import { useState, useEffect } from "react";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.css";
import SignOut from "./SignOut.jsx";
import Navbar from "./Navbar.jsx";
import ChannelPreview from "./ChannelPreview.jsx";
import {
  updateDoc,
  doc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext.jsx";

function Sidebar({
  selectedChannel,
  setSelectedChannel,
  setSelectedChannelName,
  isChannelToggle,
  toggleChannel,
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
        const previews = await Promise.all(
          channels.map(async (channel) => {
            const messagesRef = collection(
              db,
              "channels",
              channel.id,
              "messages"
            );
            const q = query(
              messagesRef,
              orderBy("createdAt", "desc"),
              limit(1)
            );
            const messagesSnapshot = await getDocs(q);
            const messages = messagesSnapshot.docs.map((doc) => doc.data());
            const lastMessage = messages.length > 0 ? messages[0] : null;
            return { ...channel, lastMessage };
          })
        );
        setChannelPreviews(previews);
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

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

  // Filter channels based on the toggle state
  const filteredChannels = isChannelToggle
    ? channels.filter((channel) => channel.channel === true)
    : channels.filter((channel) => channel.channel === false);

  return (
    <div className="sidebar">
      <Navbar isChannelToggle={isChannelToggle} toggleChannel={toggleChannel} />
      <div className="previews">
        {filteredChannels
          .map((channel) => (
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
          <SignOut />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
