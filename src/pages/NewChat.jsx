import Sidebar from '../components/Sidebar'
import CreateNewChat from '../components/CreateNewChat'
import { useChat } from "../contexts/ChatContext";


function NewChat() {
    const{selectedChannel, setSelectedChannel, toggleChannel, isChannelToggle, setIsChannelToggle, selectedChannelName, setSelectedChannelName} = useChat();
    
    return (
      <div className='chatroom'>
        <div className='container'>
            <Sidebar 
                selectedChannel={selectedChannel}
                setSelectedChannel={setSelectedChannel}
                selectedChannelName={selectedChannelName}
                setSelectedChannelName={setSelectedChannelName}
                isChannelToggle={isChannelToggle}
                setIsChannelToggle={setIsChannelToggle}
                toggleChannel={toggleChannel}
            />
            <CreateNewChat />
        </div>
    </div>  
    )
}

export default NewChat;