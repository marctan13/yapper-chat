import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Chatroom() {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");
  const messagesRef = collection(db, "messages");
  const { user } = useAuth();

  console.log(messagesRef.docs);
  // console.log(user.displayName);

  //gets all users
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersRef);
      setUsers(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      console.log(users);
    };
    getUsers();
  }, []);

  //gets messages
  // const query = messagesRef.sort("createdAt").limit(25);
  // console.log(query);

  //listen to data with a hook which returns an array of objects where
  // each object is the chat message
  // const [messages] = useCollectionData(query, {idField: 'id'});
  // console.log(messages);

  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar />
        <Chats />
      </div>
    </div>
  );
}

export default Chatroom;
