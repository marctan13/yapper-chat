import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Setting from "../components/Setting";
import { useChat } from "../contexts/ChatContext";


function Settings() {
  const [selectedChannelName, setSelectedChannelName] = useState("");
<<<<<<< HEAD
  const{selectedChannel, setSelectedChannel, toggleChannel, isChannelToggle, setIsChannelToggle, members} = useChat();
=======
  const{selectedChannel, setSelectedChannel, toggleChannel, isChannelToggle, setIsChannelToggle} = useChat();
>>>>>>> c6e58aee2ac96007d859bcc7f4554d99a4392325

  return (
    <div className="chatroom">
      <div className="container">
        <Sidebar
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
          selectedChannelName={selectedChannelName}
          setSelectedChannelName={setSelectedChannelName}
          isChannelToggle={isChannelToggle}
          toggleChannel={toggleChannel}
<<<<<<< HEAD
          members={members}
=======
>>>>>>> c6e58aee2ac96007d859bcc7f4554d99a4392325
        />
        <Setting />
      </div>
    </div>
  );
}

export default Settings;
