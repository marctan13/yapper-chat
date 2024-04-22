import { useState } from 'react';
import Sidebar from '../components/Sidebar'
import Search from '../components/Search'

function SearchUser() {
    const [selectedChannel, setSelectedChannel] = useState("null");
    const [selectedChannelName, setSelectedChannelName] = useState("");
    const [ isChannelToggle, setIsChannelToggle ] = useState(true);
    
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
            <Search />
        </div>
    </div>  
    )
}

export default SearchUser;
