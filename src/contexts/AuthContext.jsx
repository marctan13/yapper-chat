import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, db } from "../firebase.js";
import {
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  sendEmailVerification,
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { getDocs, collection } from "firebase/firestore";

//declare context
const AuthContext = createContext();

//to be used by other components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const usersRef = collection(db, "users");
  const [users, setUsers] = useState([]);

  //   Sign up
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   Normal Sign in
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   Google Sign in
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;
      return googleUser; // Return the user's information after successful sign-in
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };
  // Sign Out
  const logOut = () => {
    return signOut(auth);
  };

  // update email
  const changeEmail = async (user, newEmail) => {
    await verifyBeforeUpdateEmail(user, newEmail);
    await updateEmail(user, newEmail);
  };

  //verify email
  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent");
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  };

  //update password
  const changePassword = async (user, newPassword) => {
    await updatePassword(user, newPassword);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //update display name
  const changeDisplayName = (newDisplayName) => {
    updateProfile(user, {
      displayName: newDisplayName,
    });
  };

  // checks user validation and grabs user collection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    const getUsers = async () => {
      const data = await getDocs(usersRef);
      const usersData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersData);
    };
    getUsers();
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    signIn,
    signUp,
    signInWithGoogle,
    logOut,
    resetPassword,
    changeEmail,
    changePassword,
    users,
    sendVerificationEmail,
    changeDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
