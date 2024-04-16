//work on layout of users on css
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { QrCode } from "react-bootstrap-icons";

function Search() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [username, setUsername] = useState("");
  const [addUser, setAddUser] = useState("");
  const [err, setErr] = useState(false);

  // const handleSearch = async () => {
  //   const q = query (
  //     collection(db, "users"),
  //     where("displayName", "==", username)
  //   );
  //  try {
  //   const QuerySnapshot = await getDocs(q);
  //   QuerySnapshot.forEach((doc) => {
  //     setAddUser(doc.data());
  //   });
  //  } catch (err){
  //   setErr(true);
  //  }
  // };

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setAddUser(userData);
        setErr(false); // Reset error state if a user is found
      } else {
        setAddUser(null); // Reset addUser state if no user is found
        setErr(true);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setErr(true);
    }
  };

  // const handleAdd = async () => {
  //  const userUid = user.uid;
  //  const currentUserQuery = query(
  //   collection(db,"users"),
  //   where("uid", "==",userUid)
  //  );
  //   const userQuerySnapshot = await getDocs(currentUserQuery);
  //   const userDocId = userQuerySnapshot.docs.find((doc) => doc.exists())?.id;
  //   await addDoc(collection(db, "channels"), {
  //     name:addUser.displayName,
  //     members: [userDocId,addUser.docid],
  //     image:  addUser.photoURL ? addUser.photoURL : "/avatar.png",
  //     channel: false,
  //   });
  //   navigate("/");
  //   console.log(userDocId);
  // };

  const handleAdd = async () => {
    const userUid = user.uid;
    const currentUserQuery = query(
      collection(db, "users"),
      where("uid", "==", userUid)
    );
    const userQuerySnapshot = await getDocs(currentUserQuery);
    const currentUserDoc = userQuerySnapshot.docs.find((doc) => doc.exists());
    const currentUserDocId = currentUserDoc?.id;
    const currentUserDisplayName = currentUserDoc?.data().displayName;
  
    if (addUser) {
      const channelName = `${currentUserDisplayName} & ${addUser.displayName}`;
      await addDoc(collection(db, "channels"), {
        name: channelName,
        members: [currentUserDocId, addUser.docid],
        image: addUser.photoURL ? addUser.photoURL : "/avatar.png",
      });
      navigate("/");
    } else {
      console.error("No user found to add to channel.");
    }
  };

  const handleKey = (e) => {
    e.code === handleSearch();
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
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
          {err && <p className="error-msg">User not found!</p>}
          {addUser && (
            <div className="addNewFriend">
              <img src={addUser.photoURL} alt="" />
              <span>{addUser.displayName}</span>
              <button className="add-user-btn" onClick={handleAdd}>
                Add User
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
