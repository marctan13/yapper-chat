import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import ChatMenuItem from "./ChatMenuItem";

function Header({ selectedChannel, selectedChannelName }) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [channelImage, setChannelImage] = useState(null);


  //the id in the members array of the channel collection should be the docid
  //alter createnewchat to input the members' docid instead of uid

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        if (!selectedChannel) return;

        const channelDocRef = doc(db, "channels", selectedChannel);
        const unsubscribe = onSnapshot(
          channelDocRef,
          async (channelDocSnap) => {
            const memberIds = channelDocSnap.data().members;
            const memberProfiles = await Promise.all(
              memberIds.map(async (memberId) => {
                //fetches user document by its document ID
                const userDocRef = doc(db, "users", memberId);
                console.log(memberId);
                // console.log("Fetching user document for ID:", memberId);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                  // const userData = userDocSnap.data();
                  // const docid = userData.docid;
                  // console.log("User document exists for ID:", memberId);
                  userDocSnap.data()
                  // return userDocSnap.data();
                } else {
                  console.error(
                    `User document for ID ${memberId} does not exist`
                  );
                  return null;
                }
              })
            );
            setMembers(memberProfiles.filter((profile) => profile !== null));
            const imageUrl = channelDocSnap.data().image;
            setChannelImage(imageUrl);
          }
        );

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchChannelData();
  }, [selectedChannel]);

  console.log(members);

  return (
    <div className="header">
      <div className="chatAvatar">
        {channelImage && (
          <img className="chatLogo" src={channelImage} alt="Channel Image" />
        )}
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
              .map((member, index) => (
                <img
                  key={index}
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
