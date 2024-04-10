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
  onSnapshot,
  limit,
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
  const [channelPreviews, setChannelPreviews] = useState([]);

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    const unsubscribe = async () => {
      onSnapshot(
        collection(db, "channels"),
        (snapshot) => {
          snapshot.docs.map((channelDoc) => {
            const channelData = channelDoc.data();
            const { id } = channelDoc;
            const { name, image } = channelData;
            const messagesRef = collection(db, "channels", id, "messages");
            const q = query(
              messagesRef,
              orderBy("createdAt", "desc"),
              limit(1)
            );

            return {
              id,
              name,
              image,
              lastMessage: null,
              unsubscribe: onSnapshot(q, (messagesSnapshot) => {
                const messages = messagesSnapshot.docs.map((doc) => doc.data());
                const lastMessage = messages.length > 0 ? messages[0] : null;
                return { id, name, image, lastMessage };
              }),
            };
          });
          setChannelPreviews(channels);
        },
        (error) => {
          console.error("Error fetching channels:", error);
        }
      );
    };

    return () => {
      unsubscribe();
    };
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
            // latestMessageTimestamp={preview.latestMessageTimestamp}
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
