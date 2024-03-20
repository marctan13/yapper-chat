import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { auth } from "../firebase.js";
import { db } from "../firebase"
import { onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { Trash } from "react-bootstrap-icons";

function ChannelPreview() {
    const [chats, setChats] = useState([])

    const { user }  = useAuth();

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
                        if(doc.exists()) {
                         setChats(doc.data())
                        } else {
                         console.log("No doc found")
                        }
                    })

            return () => {
                unsub()
            }
        }
        user.uid && getChats();
    }, [user.uid])

    console.log(Object.entries(chats))
    
    async function deleteChat(chatId) {
        const docRef = doc(db, 'chats', chatId);
        await deleteDoc(docRef);
    }

    const handleSelect = (u) => {
        dispatchEvent({type:"CHANGE_USER", payload: u})
    }

    return (
        <div className="chatPreview">
        {Object.entries(chats)?.map((chat) => (
            <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
            {/* <img src={chat[1].userInfo.photoURL}/> */}
            <img src={auth.currentUser.photoURL ? auth.currentUser.photoURL : chat[1].userInfo.photoURL} />
            <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].userInfo.lastMessage?.text}</p>
                <span>
                    <Trash style={{ height: "100%" }} size={35} onClick={deleteChat} />
                </span>
            </div>
        </div>
        ))}
        </div>
    )
}

export default ChannelPreview