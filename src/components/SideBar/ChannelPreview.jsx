// import { useEffect, useState } from "react"
//import { AuthContext } from "./AuthContext"
//import { db, onSnapshot, doc } from "./Firestore"
import { Trash } from "react-bootstrap-icons";

function ChannelPreview( props ) {
  //*BRINGS LATEST MESSAGE ON TOP*
  // const [chats, setChats] = useState([])

  // const {currentUser} = useContext(AuthContext)

  // useEffect(() => {
  //     const getChats = () => {
  //         const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //                     if(dov.exists()) {
  //                      setChats(doc.data())
  //                     } else {
  //                      console.log("No doc found")
  //                     }
  //                 })

  //         return () => {
  //             ubsub()
  //         }
  //     }
  //     if(currentUser && currentUser.uid) {
  //        getChats()
  //     }
  // }, [currentUser.uid])

  // console.log(Object.entries(chats))

  return (
    <div className="chatPreview">
      {/*  LAYOUT FOR CHAT DISPLAY
            
                {Object.entries(chats)?.map((chat) => (
                <div className="userChat" key={chat[0]}>
                <img src={chat[1].userInfo.photoURL}/>
                <div className="userChatInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].userInfo.lastMessage?.text}</p>
                </div>
            </div>
            ))} */}
      {/*TEMP LINE */}
      <div className="userChat">
        <img src="/avatar.png" alt="avatar" />
        <div key={props.key} className="name-chat">
          <h3>{props.name}</h3>
        </div>
        <span>
          <Trash style={{ height: "100%" }} size={35} />
        </span>
      </div>
    </div>
  );
}

export default ChannelPreview;
