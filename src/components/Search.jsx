//work on layout of users on css
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { QuerySnapshot, collection, getDocs, query, where, startAt, endAt, orderBy, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons";

function Search({ selectedChannel, setSelectedChannel }) {
  const navigate = useNavigate();
  const { user, getUserDocId } = useAuth();

  const [username, setUsername] = useState("");
  const [addUser, setAddUser] = useState([]);
  const [err,setErr] = useState(false);

  useEffect(() => {
    if(username == '') {
      setErr(false);
      setAddUser([]);
    } else {
      handleSearch();
    }
    // console.log(username);
  }, [username])

  const handleSearch = async () => {
    // if(username != null) {
      const q = query (
        collection(db, "users"),
        orderBy('searchName'),
        startAt(username.toLowerCase()),
        endAt(username.toLowerCase() + '\uffff')
      );
      try {
        const QuerySnap = await getDocs(q);
        setAddUser([]);
        let arr = [];
        QuerySnap.forEach((doc) => {
          arr.push(doc.data());
        });
        if(arr[0] == null) throw new Error('Query response empty!');
        setAddUser(arr.slice());
      } catch (err){
        setErr(true);
      }
  };

  const handleAdd = async (id) => {
    const userDocId = await getUserDocId();
    const user2 = addUser.filter((users) => users.uid == id);
    const newChannelRef = await addDoc(collection(db, 'channels'), {
      channel: false,
      name: user.displayName + ', ' + user2[0].displayName,
      members: [userDocId, user2[0].docid],
      image: user2[0].photoURL ? user2[0].photoURL : "/avatar.png",
    });
    
    if (!selectedChannel) {
      //setSelectedChannel(newChannelRef.id);
    }
    navigate("/");
  };

  return (
    <div className="rightSection">
      <div className="header">
        <h1>Find a Fellow Yapper</h1>
      </div>
      <div className="chatWrapper">
        <p onClick={() => navigate("/")}>&lt; Back</p>
        <div className="searchUsername">
          <div className="FindUser">
            <h2>Find a user</h2>
            <input
              className="searchInput"
              placeholder="type a username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            {/* <button className = "search-btn" onClick={handleSearch}>Search</button> */}
          </div>
          {err && <p className="error-msg">User not found!</p>}
          {addUser.map((users) => (
            <div key={users.uid} className="addNewDm">
              <div className="userInfo">
                <img src ={users.photoURL ? users.photoURL : "avatar.png"} alt={users.displayName}/>
                <span className="addNewDmName">{users.displayName}</span>
              </div>
              <button
                className="addBtn"
                onClick={() => handleAdd(users.uid)}
              >
                <FontAwesomeIcon icon={faMessage} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;