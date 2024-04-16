import Sidebar from '../components/Sidebar'
import Search from '../components/Search'

function SearchUser() {
    return (
      <div className='chatroom'>
        <div className='container'>
            <Sidebar />
            <Search />
        </div>
    </div>  
    )
}

export default SearchUser;