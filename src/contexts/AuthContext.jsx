import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase.js";
import {
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
} from "firebase/auth";

//declare context
const AuthContext = createContext();

//to be used by other components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

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
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  // checks user validation
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
