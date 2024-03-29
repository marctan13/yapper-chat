import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Message from "./Message";
import { collection, getDocs } from "firebase/firestore";
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
        // Sort messages by createdAt
        allMessages.sort((a, b) => a.createdAt - b.createdAt);
        setMessages(allMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedChannel, formValue]);

  console.log(messages);
  return (
    <>
      <div className="chatMessages">
        {messages.map((message) => (
          <Message
            key={message.id}
            {...message}
            messageId={message.id}
            selectedChannel={selectedChannel}
          />
        ))}
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
