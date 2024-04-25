import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import CreateNewChat from '../components/CreateNewChat';
import { useAuth } from "../contexts/AuthContext.jsx";
import { useChat } from "../contexts/ChatContext";


function NewChat() {
    const [selectedChannelName, setSelectedChannelName] = useState("");
    const { currentUser, customAvatar } = useAuth();
    const { selectedChannel, setSelectedChannel, toggleChannel, isChannelToggle, setIsChannelToggle, members } = useChat();
    
    return (
        <div className='chatroom'>
            <div className='container'>
                <Sidebar 
                    selectedChannel={selectedChannel}
                    setSelectedChannel={setSelectedChannel}
                    selectedChannelName={selectedChannelName}
                    setSelectedChannelName={setSelectedChannelName}
                    isChannelToggle={isChannelToggle}
                    toggleChannel={toggleChannel}
                    members={members}
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