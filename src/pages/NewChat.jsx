import Sidebar from '../components/Sidebar'
import CreateNewChat from '../components/CreateNewChat'

function NewChat() {
    return (
      <div className='chatroom'>
        <div className='container'>
            <Sidebar />
            <CreateNewChat />
        </div>
    </div>  
    )
}

export default NewChat;