import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import CreateNewChat from '../components/CreateNewChat'

function NewChat() {
    const [selectedChannel, setSelectedChannel] = useState("null");
    const [selectedChannelName, setSelectedChannelName] = useState("");
    
    return (
      <div className='chatroom'>
        <div className='container'>
            <Sidebar 
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
                selectedChannelName={selectedChannelName}
                setSelectedChannelName={setSelectedChannelName}
            />
            <CreateNewChat />
        </div>
    </div>  
    )
}

export default NewChat;