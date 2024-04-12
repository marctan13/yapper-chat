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
import { getDocs, collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";

const AuthContext = createContext();

//to be used by other components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, "users");

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

  const logOut = () => {
    return signOut(auth);
  };

  const changeEmail = async (user, newEmail) => {
    await verifyBeforeUpdateEmail(user, newEmail);
    await updateEmail(user, newEmail);
  };

  const sendVerificationEmail = async (user) => {
    try {
      await sendEmailVerification(user);
      console.log("Verification email sent");
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }
  };

  const changePassword = async (user, newPassword) => {
    await updatePassword(user, newPassword);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const changeDisplayName = (newDisplayName) => {
    updateProfile(user, {
      displayName: newDisplayName,
    });
  };

  //fetch channels and filter
const fetchChannels = async () => {
  try {
    const channelsCollection = collection(db, "channels");
    // Subscribe to real-time updates on the channels collection
    const unsubscribe = onSnapshot(channelsCollection, async (snapshot) => {
      const userUid = user.uid;
      // Fetch the user document based on user's uid
      const userQuery = query(
        collection(db, "users"),
        where("uid", "==", userUid)
      );
      const userQuerySnapshot = await getDocs(userQuery);
      // Get the docid of the user document
      const userDocId = userQuerySnapshot.docs.find((doc) =>
        doc.exists()
      )?.id;

      // Process the channels data
      const channelsData = [];
      for (const doc of snapshot.docs) {
        const channel = {
          id: doc.id,
          ...doc.data(),
        };
        // Fetch the most recent message for the channel
        const messagesQuery = query(
          collection(db, "channels", channel.id, "messages"),
          orderBy("createdAt", "desc"), // Assuming createdAt field for messages
          limit(1)
        );
        const messageSnapshot = await getDocs(messagesQuery);
        const recentMessage = messageSnapshot.docs[0]?.data();
        // Attach the most recent message to the channel
        channel.recentMessage = recentMessage;
        channelsData.push(channel);
      }

      // Sort channels by their most recent message
      channelsData.sort((a, b) => {
        const messageA = a.recentMessage?.createdAt || 0;
        const messageB = b.recentMessage?.createdAt || 0;
        return messageB - messageA;
      });

      // Filter channels based on user membership
      const filteredChannels = channelsData.filter((channel) =>
        channel.members.includes(userDocId)
      );

      // Set the channels state
      setChannels(filteredChannels);
    });
    // Return the unsubscribe function to stop listening for updates when needed
    return unsubscribe;
  } catch (error) {
    console.error("Error fetching channels: ", error);
  }
};


  // checks user validation and grabs user collection
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      fetchChannels(currentUser.uid);
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
    channels,
    fetchChannels,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}