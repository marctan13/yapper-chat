import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import CreateNewChat from '../components/CreateNewChat'
import { useChat } from "../contexts/ChatContext";


function NewChat() {
    const [selectedChannelName, setSelectedChannelName] = useState("");
    const{selectedChannel, setSelectedChannel, toggleChannel, isChannelToggle, setIsChannelToggle,members} = useChat();
    
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
            <CreateNewChat />
        </div>
    </div>  
    )
}

export default NewChat;