import { useState } from 'react';
import UserList from './UserList';
import { useNavigate } from "react-router-dom";
import { useChatContext } from 'stream-chat-react'

function CreateNewChat() {
    const navigate = useNavigate(); 

    const { client, setActiveChat } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [chatName, setChatName] = useState('');

    const handleChange = (e) => {
        e.preventDefault();

        setChatName(e.target.value);
    }

    const createChat = async (e) => {
        e.preventDefault();

        try {
            const newChat = await client.channel(chatName, {
                name: chatName, members: selectedUsers
            });

            await newChat.watch();
            setChatName('');
            setSelectedUsers([client.userID]);
            setActiveChat(newChat);
            
        } catch(error) {
            console.log(error);
        }

    }

    return (
        <div className="rightSection">
            <div className="header">
                <h1>Create New Message</h1>
            </div>
            <div className="chatWrapper">
                <p onClick={() => navigate("/")}>&lt; Back</p>
                <form className='createChatDetails'>
                    <h2>Chat Name </h2>
                    <input 
                        className='chatNameBox'
                        placeholder='Type in Chat Name'
                        type='text'
                        onChange={handleChange}
                        value={chatName}
                    />
                    <h2 className='addMembers'>Add Members </h2>
                    <UserList />
                    <button className='createChatBtn' onClick={createChat}>Create New Chat</button>    
                </form>
            </div>
        </div>
    )
}

export default CreateNewChat;

//setSelectedUsers={setSelectedUsers} => add to <UserList