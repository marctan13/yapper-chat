import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
// import { useCollectionData } from 'react-firebase-hooks/firestore';

function CreateNewChat({ path }) {
  const navigate = useNavigate();
  const user = useAuth();
  const { users } = useAuth();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [chatName, setChatName] = useState("");
  // const chat = useRef();
  // const query = collection(db, "channels/")
  // const [selected, setSelected] = useState(false);

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

    // setSelected((prevSelected) => !prevSelected);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // const docRef = doc(db, path, chat.current.value)
    // await setDoc(docRef, {name: chat.current.value})
    const newChat = await addDoc(collection(db, "channels"), {
      name: chatName,
      members: [...selectedUsers]
    });
    setChatName("");
    setSelectedUsers([]);
    navigate("/");
  }
  console.log(selectedUsers);

  return (
    <div className="rightSection">
      <div className="header">
        <h1>Create New Message</h1>
      </div>
      <div className="chatWrapper">
        <p onClick={() => navigate("/")}>&lt; Back</p>
        <form className="createChatDetails" onSubmit={handleSubmit}>
          <h2>Chat Name </h2>
          <input
            className="chatNameBox"
            placeholder="Type in Chat Name"
            type="text"
            onChange={handleChange}
            value={chatName}
          />
          <h2 className="addMembers">Add Members </h2>
          {/* <UserList setSelectedUsers={setSelectedUsers}/> */}(
          {users.map((user) => {
            return (
              <div
                className="userItem-wrapper"
                key={user.id}
                onClick={() => handleSelect(user.id)}
              >
                <img src={user.photoURL || "avatar.png"} size={32} />
                <p>{user.displayName}</p>
              </div>
              // {selected ? (<img src='selected.png' />) : (<div className="emptySelected"></div>) }
            );
          })}
          )<button className="createChatBtn">Create New Chat</button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewChat;
