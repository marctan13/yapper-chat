import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider, db } from "../firebase.js";
import {
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import {getDocs, collection} from "firebase/firestore"

//declare context
const AuthContext = createContext();

//to be used by other components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const usersRef = collection(db, "users")
  const [users, setUsers] = useState([])

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
    signInWithPopup(auth, googleProvider);
  };
  // Sign Out
  const logOut = () => {
    return signOut(auth);
  };

  // update email
  const changeEmail = (email) => {
    return updateEmail(email);
  };
  
  //update password
  const changePassword = (password) => {
    return updatePassword(password)
  };
 
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
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
      setUsers(usersData)
    }
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
    users
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
