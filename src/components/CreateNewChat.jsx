import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useChat } from "../contexts/ChatContext";

function CreateNewChat({ customAvatar, currentUser }) { // Try passing customAvatar and currentUser as props
  const navigate = useNavigate();
  const { users, user, getUserDocId } = useAuth();
  const{selectedChannel, setSelectedChannel} = useChat();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [chatName, setChatName] = useState("");
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setChatName(e.target.value);
  };

  const handleSelect = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });

    setSelected((prevSelected) => !prevSelected);
  };

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const userDocId = await getUserDocId();
    const newChannelRef = await addDoc(collection(db, "channels"), {
      name: chatName,
      members: [userDocId, ...selectedUsers],
      image: img,
      channel: true,
    });
    if (!selectedChannel) {
      setSelectedChannel(newChannelRef.id);
    }
    setChatName("");
    setSelectedUsers([]);
    setImg(null);
    navigate("/");
  }

  

  return (
    <div className="rightSection">
      <div className="header">
        <h1>Create New Channel</h1>
      </div>
      <div className="chatWrapper">
        <p onClick={() => navigate("/")}>&lt; Back</p>
        <form className="createChatDetails" onSubmit={handleSubmit}>
          <div className="createChatTop">
              <div className="chatName">
              <h2>Channel Name</h2>
              <input
                className="chatNameBox"
                placeholder="Type in Chat Name"
                type="text"
                onChange={handleChange}
                value={chatName}
                required
              />
            </div>
            <div className="setChatImg">
              <h2>Add Channel Image</h2>
              <input
                type="file"
                id="file"
                onChange={handleImg}
                className="imageFile"
                src="image.png"
              />
            </div>
          </div>
          <div className="addMemberSection">
              <h2 className="addMembersTitle">Add Members</h2>
            <div className="addInfo">
                <span>User</span>
                <span className="invited">Invited</span>
              </div>
            <div className="addMembers">
              {users
                .filter((u) => u.uid !== user.uid)
                .map((user) => {
                  return (
                    <div
                      className={`userItem-wrapper ${
                        selectedUsers.includes(user.uid) ? "selected" : ""
                      }`}
                      key={user.uid}
                      onClick={() => handleSelect(user.id)}
                    >
                      <div className="userInfo">
                        <img src={user.photoURL || "avatar.png"} alt="" className="user-avatar" />
                        <p className="user-display-name">{user.displayName}</p>
                      </div>
                      {selectedUsers.includes(user.id) && (
                        <img
                          src="checked.png"
                          alt="Selected"
                          className="selectedImage"
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
          
          <button className="createChatBtn">Create New Chat</button>
          {/* <button className="createChatBtn">Create New Chat</button> */}
        </form>
      </div>
    </div>
  );
}

export default CreateNewChat;
