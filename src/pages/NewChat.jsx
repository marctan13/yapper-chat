import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import CreateNewChat from '../components/CreateNewChat'
import { useChat } from "../contexts/ChatContext";


function NewChat() {
    // const [selectedChannel, setSelectedChannel] = useState("null");
    const [selectedChannelName, setSelectedChannelName] = useState("");
    const [isChannelToggle, setIsChannelToggle] = useState(true);
    const{selectedChannel, setSelectedChannel} = useChat();


    const toggleChannel = () => {
      setIsChannelToggle((prev) => !prev);
    };
    
    const toggleChannel = () => {
        setIsChannelToggle(prev => !prev);
      }
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
            />
            <CreateNewChat />
        </div>
    </div>  
    )
}

export default NewChat;