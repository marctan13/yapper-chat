//work on layout of users on css
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

function Search() {
  const navigate = useNavigate();
  const {user} = useAuth();
  
  const [username, setUsername] = useState("");
  const [addUser, setAddUser] = useState("");
  const [err,setErr] = useState(false);

  const handleSearch = async () => {
    const q = query (
      collection(db, "users"),
      where("displayName", "==", username)
    );
   try {
    const QuerySnapshot = await getDocs(q);
    QuerySnapshot.forEach((doc) => {
      setAddUser(doc.data());
    });
   } catch (err){
    setErr(true);
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
        <div className="searchUsername" >
          <div className="FindUser">
            <h2>Find a user</h2>
            <input
              className="searchInput"
              placeholder="Find a user"
              type="text"
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <button className = "search-btn" onClick={handleSearch}>Search</button>
            {err && <p className="error-msg">User not found!</p>}
          </div>
          {err && <p className="error-msg">User not found!</p>}
          {addUser && (
            <div className="addNewFriend">
              <img src = {addUser.photoURL} alt=""/>
              <span>{addUser.displayName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
