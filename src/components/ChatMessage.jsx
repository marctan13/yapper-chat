import Input from "./Input";
import Message from "./Message";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from '../contexts/ChatContext'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

function ChatMessage() {

  const [messages, setMessages] = useState([])
  const { data } = useContext(ChatContext)

  useEffect(() => {
    if (data && data.chatId) {
      const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc)=>{
        doc.exists() && setMessages(doc.data().messages)
      })

      return () => {
        unsub()
      }
    }
  }, [data])

  if(!data || !data.chatId) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="chatMessages">
        <Message />
        <Input />
      </div>
    </>
  );
}

export default ChatMessage;
