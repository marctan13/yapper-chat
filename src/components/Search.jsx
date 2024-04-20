//work on layout of users on css
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { QuerySnapshot, collection, getDocs, query, where, startAt, endAt, orderBy } from "firebase/firestore";
import { db } from "../firebase";

function Search() {
  const navigate = useNavigate();
  const {user} = useAuth();
  
  const [username, setUsername] = useState("");
  const [addUser, setAddUser] = useState([]);
  const [err,setErr] = useState(false);

  useEffect(() => {
    if(username == null) {
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
          console.log(doc.data());
          arr.push(doc.data());
        });
        if(arr[0] == null) throw new Error('Query response empty!');
        setAddUser(arr.slice());
      } catch (err){
        setErr(true);
      }
    // }
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
