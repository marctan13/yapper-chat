import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAuth } from "../contexts/AuthContext";
import { PersonAdd } from "react-bootstrap-icons";
// import { useAuth } from "../contexts/AuthContext";

function Header({
  selectedChannel,
  selectedChannelName,
  setSelectedChannelName,
  setSelectedChannel,
}) {
  const [members, setMembers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);
  const [channelImage, setChannelImage] = useState(null);
  const [show, setShow] = useState(false);
  const newChannelName = useRef();
  const newChannelImage = useRef();
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

        // Fetch all users from the database
        const usersQuerySnapshot = await getDocs(collection(db, "users"));
        const allUsers = usersQuerySnapshot.docs.map((doc) => doc.data());
        // Filter out users who are not members of the selected channel
        const nonMembers = allUsers.filter(
          (user) => !members.some((member) => member.uid === user.uid)
        );
        setNonMembers(nonMembers);

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchChannelData();
  }, [selectedChannel]);

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChannelImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (!selectedChannel) return;
      const channelDocRef = doc(db, "channels", selectedChannel);
      await updateDoc(channelDocRef, {
        name: newChannelName.current.value,
        // image: newChannelImage.current.value,
      });
      handleClose();
    } catch (error) {
      console.error("Failed to change name", error);
      throw error;
    }
  };

  const handleLeaveChannel = async () => {
    try {
      const userUid = user.uid;
      // Fetch the user document based on user's uid
      const userQuery = query(
        collection(db, "users"),
        where("uid", "==", userUid)
      );
      const userQuerySnapshot = await getDocs(userQuery);
      // // Get the docid of the user document
      const userDocId = userQuerySnapshot.docs.find((doc) => doc.exists())?.id;
      if (!selectedChannel || !userDocId) return;
      const channelDocRef = doc(db, "channels", selectedChannel);
      // Fetch the current members of the channel
      const channelDocSnapshot = await getDoc(channelDocRef);
      const currentMembers = channelDocSnapshot.data().members;

      if (!currentMembers || currentMembers.length === 0) {
        // If members array is empty or null, just return
        return;
      }
      // Remove the current user's ID from the members array
      const updatedMembers = currentMembers?.filter(
        (memberId) => memberId !== userDocId
      );
      await updateDoc(channelDocRef, { members: updatedMembers });
      setSelectedChannel(null);
      setSelectedChannelName("");
      window.location.reload();
      // handleClose();
    } catch (error) {
      console.error("Failed to leave channel", error);
      throw error;
    }
  };

  // Function to handle adding a user to the channel
  const handleAddMember = async (userId) => {
    try {
      const channelDocRef = doc(db, "channels", selectedChannel);
      const channelDocSnapshot = await getDoc(channelDocRef);
      const currentMembers = channelDocSnapshot.data().members || []; //gets snapshot of members of selected channel
      const updatedMembers = [...currentMembers, userId];
      await updateDoc(channelDocRef, { members: updatedMembers });
    } catch (error) {
      console.error("Failed to add member to channel", error);
    }
  };

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

        {/* **CHAT MENU** */}
        <Modal
          show={show}
          onHide={handleClose}
          centered
          style={{
            color: "white",
            backgroundColor: "#7a7a7a",
            height: "50%",
            width: "20%",
            top: "25%",
            left: "40%",
            borderRadius: "10px",
            overflowY: "auto",
            padding: "1.5rem",
          }}
        >
          <Modal.Header
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{
                margin: "10px 10px 10px 0",
              }}
            >
              &times;
            </Button>
            <Modal.Title
              style={{
                fontSize: "20px",
                fontWeight: "500",
                marginTop: "5px",
              }}
            >
              Chat Menu
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {channelImage && (
              <img
                className="chatLogo"
                src={channelImage}
                alt="Channel Image"
                style={{
                  width: "75px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
            )}
            {!channelImage && selectedChannelName && (
              <img
                className="chatLogo"
                src="/cup.jpg"
                alt="Placeholder Image"
                style={{
                  width: "75px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
            )}
            <h3>Change Channel Image</h3>
            <input type="file" id="file" onChange={handleImg} />
            <h3>Change Channel Name</h3>
            <input
              type="text"
              placeholder="Edit Channel Name"
              ref={newChannelName}
              style={{
                borderRadius: "5px",
                width: "170px",
                height: "30px",
                marginBottom: "1.5rem",
                marginTop: ".5em",
              }}
            />
            <div>
              <Button
                variant="primary"
                onClick={handleClick}
                style={{
                  borderRadius: "5px",
                }}
              >
                Save Changes
              </Button>
              {/* Displays Members in Channel */}
              <h5>Members</h5>
              {selectedChannel &&
                members &&
                members.map((member, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {selectedChannel && (
                          <img
                            key={index}
                            src={member?.photoURL || "/avatar.png"}
                            alt="member image"
                            title={member?.displayName || "No Name"}
                            className="menuUserImg"
                            style={{
                              width: "35px",
                              borderRadius: "50%",
                              marginBottom: "10px",
                              marginRight: "10px",
                            }}
                          />
                        )}
                        <p>{member?.displayName}</p>
                      </div>
                    </div>
                  );
                })}
            </div>

            <hr />
            {/* Add Members into Channel */}
            <div>
              <h5>Add Members</h5>
              {selectedChannel &&
                nonMembers &&
                nonMembers
                  .filter(
                    (nonMember) =>
                      !members.some((member) => member.uid === nonMember.uid)
                  )
                  .map((nonMember, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between", // Align items and button
                          marginBottom: "10px",
                          width: "40%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {selectedChannel && (
                            <img
                              key={index}
                              src={nonMember?.photoURL || "/avatar.png"}
                              alt="nonMember image"
                              title={nonMember?.displayName || "No Name"}
                              className="menuUserImg"
                              style={{
                                width: "35px",
                                borderRadius: "50%",
                                marginBottom: "10px",
                                marginRight: "10px",
                              }}
                            />
                          )}
                          <p>{nonMember?.displayName}</p>
                        </div>
                        <PersonAdd
                          className="add-member"
                          onClick={() => handleAddMember(nonMember.docid)}
                          style={{
                            alignSelf: "flex-end",
                            marginLeft: "10px",
                          }}
                        />
                      </div>
                    );
                  })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              style={{
                borderRadius: "5px",
              }}
              onClick={handleLeaveChannel}
            >
              Leave Channel
            </Button>
          </Modal.Footer>
        </Modal>

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
