import { useState, useRef, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../firebase";
import EmojiSelection from "./EmojiSelection";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function Input({ selectedChannel, formValue, setFormValue, messageEndRef }) {
  const messageRef = useRef();
  const fileInputRef = useRef(null); 
  const { user } = useAuth();
  const [showEmojis, setShowEmojis] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [image, setImage] = useState(null); 

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      console.log("Selected file:", e.target.files[0]); // Verify it contains file data
      setImage(e.target.files[0]); 
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the value of file input element
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to send message...");
      if (formValue.trim() !== "" || image) {
        console.log("Message or image detected, proceeding...");
        if (image) {
          console.log("Image detected, uploading to Firebase Storage...");
          const storageRef = ref(storage, `images/${image.name}`);
          const uploadTask = uploadBytesResumable(storageRef, image);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% complete`);
            },
            (error) => {
              console.error("Error uploading image:", error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then(async (downloadURL) => {
                  // image URL to Firestore
                  await addDoc(collection(db, "channels", selectedChannel, "messages"), {
                    sender_id: user.uid,
                    text: "", 
                    photoURL: user.photoURL ? user.photoURL : "/avatar.png",
                    createdAt: serverTimestamp(),
                    sender_name: user.displayName,
                    image: downloadURL,
                    imageClass: "user-image",
                  });
                  setFormValue("");
                  setImage(null); // Reset image state after sending message
                  resetFileInput(); // Reset file input after sending message
                  console.log("Image uploaded successfully.");
                })
                .catch((error) => {
                  console.error("Error getting download URL:", error);
                });
            }
          );
        } else {
          console.log("No image detected, sending text message");
          await addDoc(collection(db, "channels", selectedChannel, "messages"), {
            sender_id: user.uid,
            text: formValue,
            photoURL: user.photoURL ? user.photoURL : "/avatar.png",
            createdAt: serverTimestamp(),
            sender_name: user.displayName,
          });
          setFormValue("");
          // Scroll to bottom after input
          setTimeout(() => {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
          }, 100);
          resetFileInput(); // Reset file input after sending message
          console.log("Text message sent successfully.");
        }
      } else {
        console.log("No message or image to send.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
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
        <input
          type="file"
          accept="image/*" 
          onChange={handleFileChange}
          style={{ display: "none" }} 
          id="fileInput"
          ref={fileInputRef}
        />
         <label htmlFor="fileInput">
          <img src={"/addimg.png"} alt="Add Image" style={{ width: "10em", height: "4em" }} /> 
        </label>
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
