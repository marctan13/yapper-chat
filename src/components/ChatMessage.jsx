import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import Message from "./Message";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase.js";

function ChatMessage({ selectedChannel, selectedChannelName }) {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
      if (!selectedChannel) return; // Exit if no channel is selected

    // Define an async function to fetch messages
    const fetchMessages = async () => {
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
    fetchMessages();

    // Subscribe to changes in messages collection
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

    // Scroll to the end of the message list
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    return () => unsubscribe();
  }, [selectedChannel]);

  return (
    <>
      <div className="chatMessages">
        <div className="messageBlock">
          {selectedChannel &&
            messages.map((message) => (
              <Message
                key={message.id}
                {...message}
                messageId={message.id}
                selectedChannel={selectedChannel}
              />
            ))}
          {/* Create a div at the end of messages to scroll into view */}
          <div ref={messageEndRef}></div>
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
