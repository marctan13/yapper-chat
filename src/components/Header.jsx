import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ChatMenuItem from "./ChatMenuItem";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAuth } from "../contexts/AuthContext";

function Header({
  selectedChannel,
  selectedChannelName,
  setSelectedChannelName,
  setSelectedChannel,
}) {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [channelImage, setChannelImage] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const newChannelName = useRef();
  const { user } = useAuth();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                const userDocRef = doc(db, "users", memberId);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                  return userDocSnap.data();
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

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (!selectedChannel) return;
      const channelDocRef = doc(db, "channels", selectedChannel);
      await updateDoc(channelDocRef, { name: newChannelName.current.value });
      handleClose();
    } catch (error) {
      console.error("Failed to change name", error);
      throw error;
    }
  };

  // const handleLeaveChannel = async () => {
  //   try {
  //     if (!selectedChannel) return;
  //     const channelDocRef = doc(db, "channels", selectedChannel);
  //     await updateDoc(channelDocRef, {
  //       members: members.filter((memberId) => memberId !== user.uid), // Assuming currentUserId is accessible
  //     });
  //     setSelectedChannel(null); // Clear the selected channel
  //     setSelectedChannelName(""); // Clear the selected channel name
  //     handleClose();
  //   } catch (error) {
  //     console.error("Failed to leave channel", error);
  //     throw error;
  //   }
  // };

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
        {selectedChannelName ? (
          <h1 onClick={handleShow}>{selectedChannelName}</h1>
        ) : (
          <h1>Select or Create a Channel</h1>
        )}
        <Modal
          // centered
          show={show}
          onHide={handleClose}
          centered
          style={{
            color: "white",
            backgroundColor: "#7a7a7a",
            height: "15%",
            maxWidth: "50%",
            top: "7.5%",
            left: "40%",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Chat Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Edit Channel Name"
              ref={newChannelName}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClick}>
              Save Changes
            </Button>
            {/* <Button variant="danger" onClick={handleLeaveChannel}>
              Leave Channel
            </Button> */}
          </Modal.Footer>
        </Modal>
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
                  title={member?.displayName || "No Name"}
                />
              ))}
          {members.length > 4 && (
            <div className="memberImg more-members">+{members.length - 3}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
