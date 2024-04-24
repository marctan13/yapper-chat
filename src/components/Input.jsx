import { useState, useRef, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import EmojiSelection from "./EmojiSelection";

function Input({ selectedChannel, formValue, setFormValue, messageEndRef }) {
  const messageRef = useRef();
  const { user } = useAuth();
  const [showEmojis, setShowEmojis] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "channels", selectedChannel, "messages"), {
        sender_id: user.uid,
        text: formValue,
        photoURL: user.photoURL ? user.photoURL : "/avatar.png", //change to correct user photo
        createdAt: serverTimestamp(),
        sender_name: user.displayName,
      });
      setFormValue("");
      //scroll to bottom after user input
      setTimeout(() => {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.log("Failed to send");
    }
  };

  // Sometimes it would glitch and stay on the screen, this is a fail safe.
  const startTimer = () => {
    const id = setTimeout(() => {
      setShowEmojis(false);
    }, 10000);
    setTimeoutId(id);
  };

  useEffect(() => {
    if (showEmojis) {
      startTimer();
    }
  }, [showEmojis]);

  const handleEmojiClick = (emoji) => {
    setFormValue(formValue + emoji); // Adds selected emoji into input box
    setShowEmojis(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmojis && !event.target.closest(".emojiButton")) {
        setShowEmojis(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [showEmojis]);

  return (
    <div className="inputMessage">
      <span ref={messageRef}></span>
      <form className="inputBox" onSubmit={sendMessage}>
        <input
          className="textBox"
          placeholder="Type Message here..."
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button className="send">Send</button>
        <div className="emojiButton" onClick={() => setShowEmojis(!showEmojis)}>
          <span role="img" aria-label="Emoji Menu" title="Open Emoji Menu">
            😂
          </span>
        </div>
        {showEmojis && <EmojiSelection handleEmojiClick={handleEmojiClick} />}
      </form>
    </div>
  );
}

export default Input;
