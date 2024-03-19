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
        {/* Conversation */}
        {messages.map((m) => (
          <Message message={m} key={m.id}/>
        ))}
        {/* <div className="messageBlock">
          <Message text="Want to meet up later?Want to meet up later?Want to meet up later?Want to meet up later?Want to meet up later?" />
          <Message text="Want to meet up later?" />
          <Message text="Want to meet up later?" />
        </div> */}
        {/* <div className='messageBlock'>
          <span>{data.user?.displayName}</span>
        </div> */}
        {/* input your message here */}
        <Input />
      </div>
    </>
  );
}

export default ChatMessage;
