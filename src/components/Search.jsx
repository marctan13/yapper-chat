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
  const [getBool, setGetBool] = useState(false);
  const [userQuery, setUserQuery] = useState([]);

  useEffect(() => {
    console.log(addUser.length);
    console.log(addUser);
  }, [userQuery])

  useEffect(() => {
    if(username == '') {
      //setGetBool(false);
      setErr(false);
      setAddUser([]);
    } else {
      handleSearch();
    }
  }, [username])

  const handleSearch = async () => {
    /* if(!getBool) {
      setGetBool(true); */
      const q = query (
        collection(db, "users"),
        orderBy('searchName'),
        startAt(username.toLowerCase()),
        endAt(username.toLowerCase() + '\uffff')
        //where("displayName", "==", username)
      );
      try {
        const QuerySnap = await getDocs(q);
        console.log(QuerySnap);
        setAddUser([]);
        setUserQuery([]);
        let arr = [];
        QuerySnap.forEach((doc) => {
          console.log(doc.data());
          arr.push(doc.data());
        });
        console.log(arr);
        setUserQuery(arr.slice());
        setAddUser(arr.slice());
      } catch (err){
        setErr(true);
      }
   /* } else {
      const reg = new RegExp(`^${username}.*`, 'i');
      try {
        setAddUser(userQuery.filter((user) => user.displayName.match(reg)));
        if(addUser[0] == ''){
          setErr(true);
        }
      } catch (err){
        setErr(true);
      }
    } */
  };

  useEffect(() => {
    console.log(getBool);
  }, [getBool])

  /* const handleKey = (e) => {
    console.log(getBool)
  }; */

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
              // onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <button className = "search-btn" onClick={handleSearch}>Search</button>
            {err && <p className="error-msg">User not found!</p>}
          </div>
          {err && <p className="error-msg">User not found!</p>}
          {addUser.map((users) => (
            <div className="addNewFriend">
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
