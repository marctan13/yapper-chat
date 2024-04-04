import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  getDocs,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase.js";

function SignIn() {
  const { signIn, signInWithGoogle, user } = useAuth();
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // Normal Signin
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to log in");
    }
  };

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const googleUser = await signInWithGoogle();
      // Check if the user already exists in the collection
      const querySnapshot = await getDocs(collection(db, "users"));
      const existingUser = querySnapshot.docs.find(
        (doc) => doc.data().uid === googleUser.uid
      );
      if (!existingUser) {
        const res = await addDoc(collection(db, "users"), {
          displayName: googleUser.displayName,
          email: googleUser.email,
          photoURL: googleUser.photoURL,
          created: serverTimestamp(),
          uid: googleUser.uid,
          docid: "",
        });
        //updates uid to document id
        await updateDoc(res, {
          docid: res.id,
        })
      }
      navigate("/");
    } catch (error) {
      setError("Failed to log in");
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="title-logo">
          <h1 className="logo">🗣️</h1>
          <h1 className="title">Yapper Chat</h1>
        </div>
        <form onSubmit={handleSignIn} className="form" name="signIn">
          {error && (
            <p>
              <strong>{error}</strong>
            </p>
          )}
          <input type="email" placeholder="Email..." ref={emailRef} required />
          <input
            type="password"
            placeholder="Password..."
            ref={passwordRef}
            required
          />
          <button type="submit" className="sign-in">
            Sign in
          </button>
        </form>
        <button className="sign-in" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
        <div className="links">
          <button
            className="link-btn"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
          <p>
            No account yet?{" "}
            <button onClick={() => navigate("/register")} className="link-btn">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
