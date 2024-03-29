import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import ChatMenuItem from "./ChatMenuItem";

function Header({ selectedChannel, selectedChannelName }) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [channelImage, setChannelImage] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        if (!selectedChannel) return; // Exit if no channel is selected

        // Get the channel document
        const channelDocRef = doc(db, "channels", selectedChannel);
        const channelDocSnap = await getDoc(channelDocRef);

        // Get the member IDs from the channel document
        const memberIds = channelDocSnap.data().members;

        // Fetch user profiles for each member ID
        const memberProfiles = await Promise.all(
          memberIds.map(async (memberId) => {
            const userDocRef = doc(db, "users", memberId);
            const userDocSnap = await getDoc(userDocRef);
            return userDocSnap.data();
          })
        );

        // Set the member profiles in state
        setMembers(memberProfiles);

        // Set the channel image (convert string to URL object if necessary)
        const imageUrl = channelDocSnap.data().image;
        setChannelImage(imageUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchChannelData();
  }, [selectedChannel]);

  return (
    <div className="header">
      <div className="chatAvatar">
        {channelImage && <img className="chatLogo" src={channelImage} alt="Channel Image" />}
        {!channelImage && selectedChannelName && (
          <img className="chatLogo" src="/cup.jpg" alt="Placeholder Image" />
        )}
      </div>
      <div className="teamInfo">
        <h1
          onClick={() => {
            setOpen(!open);
          }}
        >
          {selectedChannelName
            ? selectedChannelName
            : "Select or Create a Channel"}
        </h1>
        {open && (
          <div className={`dropdown-menu  ${open ? "active" : "inactive"}`}>
            <h3>Chat Menu</h3>
            <ul>
              <ChatMenuItem text="Chat Members" />
              <ChatMenuItem text="Add Members" />
              <ChatMenuItem text="Mute" />
              <ChatMenuItem text="Leave Channel" />
            </ul>
          </div>
        )}

        <div className="teamImg">
          {members &&
            members
              .slice(0, 4)
              .map((member) => (
                <img
                  key={member?.uid}
                  className="memberImg"
                  src={member?.photoURL || "/avatar.png"}
                  alt={member?.displayName || "No Name"}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
