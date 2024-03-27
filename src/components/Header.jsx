import React, { useState, useEffect } from "react";
import ChatMenuItem from "./ChatMenuItem";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Header({ selectedChannel, selectedChannelName }) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
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
            const userDocRef = doc(db, "users", memberId); // Assuming users collection and user documents are stored with IDs
            const userDocSnap = await getDoc(userDocRef);
            return userDocSnap.data();
          })
        );

        // Set the member profiles in state
        setMembers(memberProfiles);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [selectedChannel]);

  return (
    <div className="header">
      <div className="chatAvatar">
        <img className="chatLogo" src="/cup.jpg" />
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
