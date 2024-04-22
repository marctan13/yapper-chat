import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chatroom from "./pages/Chatroom";
import SignIn from "./pages/Signin";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import NewChat from "./pages/NewChat.jsx";
import SearchUser from "./pages/SearchUser.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./components/Protected.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { ChatContextProvider } from "./contexts/ChatContext.jsx";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [selectedChannel, setSelectedChannel] = useState(null);

  return (
    <div>
      <AuthProvider>
        <ChatContextProvider selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel}>
          <Routes>
            <Route exact path="/">
              <Route
                index
                element={
                  <Protected>
                    <Chatroom/>
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
                    <Settings/>
                  </Protected>
                }
              />
              <Route path="/newChat" element={<NewChat />} />
              <Route path="/SearchUser" element={<SearchUser/>} />
            </Route>
          </Routes>
        </ChatContextProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
