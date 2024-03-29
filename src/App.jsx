import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./firebase";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chatroom from "./pages/Chatroom";
import SignIn from "./pages/Signin";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import NewChat from "./pages/NewChat.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./components/Protected.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { ChatContextProvider } from "./contexts/ChatContext.jsx";

function App() {

  return (
    <div>
      <AuthProvider>
        <ChatContextProvider>
          <Routes>
            <Route exact path="/">
              <Route
                index
                element={
                  <Protected>
                    <Chatroom />
                  </Protected>
                }
              />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/settings"
                element={
                  <Protected>
                    <Settings />
                  </Protected>
                }
              />
              <Route path="/newChat" element={<NewChat />} />
            </Route>
          </Routes>
        </ChatContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
