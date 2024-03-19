import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";

function Message(props) {
  const [messageList, setMessageList] = useState([]);
  const messageCollectionRef = collection(db, "messages");

  useEffect(() => {
    const getMessageList = async () => {
      //Read the data
      //set message list
      try {
        const data = await getDocs(messageCollectionRef);
      } catch (err) {
        console.log(err);
      }
    };
    getMessageList();
  }, []);

  return (
    <>
      <div className="chatMessage sender">
        <div className="userInfo">
          <img src={"/avatar.png"} />
          <span>10:52pm</span>
        </div>
        <div className="message">
          <p>{props.text}</p>
        </div>
      </div>
      <div className="chatMessage">
        <div className="userInfo">
          <img src="/friend.png" />
          <span>10:54pm</span>
        </div>
        <div className="message">
          <p>
            What
            time?time?time?time?time?time?time?time?time?time?time?time?time?time?time?
          </p>
        </div>
      </div>
    </>
  );
}

export default Message;
