import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

//work on layout of users on css

function CreateNewChat({ path }) {
  const navigate = useNavigate();
  const { users } = useAuth();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selected, setSelected] = useState('');
  const [chatName, setChatName] = useState("");
  const [img, setImg] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();

    setChatName(e.target.value);
  };

  const handleSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }

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

    await addDoc(collection(db, "channels"), {
      name: chatName,
      members: [...selectedUsers],
      image: img
    });
    setChatName("");
    setSelectedUsers([]);
    setImg(null);
    navigate("/");
  }

  return (
    <div className="rightSection">
      <div className="header">
        <h1>Create New Message</h1>
      </div>
      <div className="chatWrapper">
        <p onClick={() => navigate("/")}>&lt; Back</p>
          <form className="createChatDetails" onSubmit={handleSubmit}>
            <div className="chatName">
              <h2>Channel Name</h2>
              <input
                className="chatNameBox"
                placeholder="Type in Chat Name"
                type="text"
                onChange={handleChange}
                value={chatName}
              />
            </div>
            <div className="setChatImg">
              <h2>Add Channel Image</h2>
              <input
                type="file"
                id="file"
                onChange={handleImg}
              />
            </div>
            <div className="addMembers">
              <h2 className="addMembers">Add Members</h2>
              {users.map((user) => {
                return (
                  <div
                    className={`userItem-wrapper ${selectedUsers.includes(user.id) ? "selected" : ""}`}
                    key={user.id}
                    onClick={() => handleSelect(user.id)}
                  >
                    <img src={user.photoURL || "avatar.png"} alt="" size={32} />
                    <p>{user.displayName}</p>
                    {selectedUsers.includes(user.id) && <img src='selected.png' alt="Selected" className="selectedImage" />}
                  </div>
                  );
              })}
          </div>
          <button className="createChatBtn">Create New Chat</button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewChat;