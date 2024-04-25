import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CreateNewChat from '../components/CreateNewChat';
import { useAuth } from "../contexts/AuthContext.jsx";

function NewChat() {
    const [selectedChannel, setSelectedChannel] = useState("null");
    const [selectedChannelName, setSelectedChannelName] = useState("");
    const { currentUser, customAvatar } = useAuth();
    
    return (
        <div className='chatroom'>
            <div className='container'>
                <Sidebar 
                    selectedChannel={selectedChannel}
                    setSelectedChannel={setSelectedChannel}
                    selectedChannelName={selectedChannelName}
                    setSelectedChannelName={setSelectedChannelName}
                />
                <CreateNewChat 
                    currentUser={currentUser}
                    customAvatar={customAvatar}
                />
            </div>
        </div>  
    );
}

export default NewChat;