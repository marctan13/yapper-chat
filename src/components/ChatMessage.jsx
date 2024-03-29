import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Message from "./Message";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase.js";

function ChatMessage({ selectedChannel, selectedChannelName }) {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChannel) return; // Exit if no channel is selected

      try {
        const messagesQuerySnapshot = await getDocs(
          collection(db, "channels", selectedChannel, "messages")
        );
        const allMessages = messagesQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        allMessages.sort(
          (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()
        );
        setMessages(allMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const unsubscribe = onSnapshot(
      query(collection(db, "channels", selectedChannel, "messages")),
      (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort messages by createdAt timestamp
        updatedMessages.sort(
          (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis()
        );
        setMessages(updatedMessages);
      }
    );
    return () => unsubscribe();
  }, [selectedChannel]);
  
  return (
    <>
      <div className={`chatMessages ${selectedChannel ? "scroll" : ""}`}>
        <div className="messageBlock">
          {messages.map((message) => (
            <Message
              key={message.id}
              {...message}
              messageId={message.id}
              selectedChannel={selectedChannel}
            />
          ))}
            </div>
          {selectedChannelName && (
            <Input
              selectedChannel={selectedChannel}
              formValue={formValue}
              setFormValue={setFormValue}
            />
          )}
      </div>
    </>
  );
}

export default ChatMessage;