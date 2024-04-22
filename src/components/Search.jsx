//work on layout of users on css
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { QuerySnapshot, collection, getDocs, query, where, startAt, endAt, orderBy, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    console.log(username);
  }, [username])

  useEffect(() => {
    console.warn(err);
  }, [err])

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
          //console.log(doc.data());
          arr.push(doc.data());
        });
        if(arr[0] == null) throw new Error('Query response empty!');
        setAddUser(arr.slice());
      } catch (err){
        setErr(true);
      }
  };

  const handleAdd = async () => {
    const userDocId = await getUserDocId();
    const newChannelRef = await addDoc(collection(db, "channels"), {
      name: addUser.displayName,
      members: [userDocId, addUser.docid],
      image: addUser.photoURL ? addUser.photoURL : "/avatar.png",
      channel: false,
    });
    if (!selectedChannel) {
      setSelectedChannel(newChannelRef.id);
    }
    navigate("/");
  };

  const sendFriendReq = async (friendId) => {
    /* const friendsRef = doc(db, 'users', user.docid, 'friends') */
    try {
      const friend = addUser.filter((users) => users.uid == friendId);
      console.log(friend);
      const q = query (
        collection(db, "users"),
        where('uid', '==', user.uid)
      );
      const QuerySnap = await getDocs(q);
      let u;
      QuerySnap.forEach((doc) => {
        u = doc.data();
      });
      const doc = u.docid;
      const res = await addDoc(collection(db, 'users', doc, 'friends'), {
        displayName: friend[0].displayName,
        photoURL: friend[0].photoURL,
        uid: friend[0].uid,
        confirmed: false,
      });
      console.log('Added document with ID: ', res.id);
    } catch (errFri) {
      console.error("Error fetching messages:" + errFri);
    }
  }

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
            <div key={users.uid} className="addNewFriend">
              <img src ={users.photoURL ? users.photoURL : "avatar.png"} alt={users.displayName}/>
              <span>{users.displayName}</span>
              <button
                className="addBtn"
                onClick={() => sendFriendReq(users.uid)}
              >
                <FontAwesomeIcon icon={faUserPlus} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
