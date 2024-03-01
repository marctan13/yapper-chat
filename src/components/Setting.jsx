import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Setting() {
  const [isClicked, setIsClicked] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { user, changeEmail } = useAuth();
  const emailRef = useRef();

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setMessage("");
      await changeEmail(user, emailRef.current.value).then(() => {
        setMessage("Check your email inbox for further instructions");
      })
    } catch (error) {
      setError("Failed to Update Email");
    }
  };

  return (
    <div className="rightSection">
      <div className="header">
        <h1>Settings</h1>
      </div>
      <div className="settingsWrapper">
        <div className="username">
          <img
            src={
              user.photoURL ? user.photoURL : "cup.jpg"
            }
          />
          <div className="username">
            <h1>{user.displayName}</h1>
            <span>{user.email}</span>
            <button
              className="editAccount"
              onClick={() => {
                setIsClicked(!isClicked);
                setError(!error);
              }}
            >
              Edit Account
            </button>
            {error && <h1>{error}</h1>}
            {message && <h1>{message}</h1>}
            {isClicked && (
              <form>
                <input
                  type="email"
                  placeholder="Enter new email"
                  ref={emailRef}
                />
                <button onClick={handleUpdateEmail}>Update Email</button>
              </form>
            )}
          </div>
        </div>
        <div className="changePassword">
          <h1>Password</h1>
          <button>Change Password</button>
        </div>
        <div className="notifications">
          <h1>Notifications</h1>
          <span>Do Not Disturb</span>
          <input type="checkbox" name="dnd" id="dnd" />
          <label htmlFor="dnd">Do Not Disturb</label>
        </div>
      </div>
    </div>
  );
}

export default Setting;
