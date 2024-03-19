import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react';

function UserList({ setSelectedUsers }) {

    const { users } = useAuth();
    console.log(users);

    const [selected, setSelected] = useState(false);

    const handleSelect = () => {

      if(selected) {
        setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
      } else {
        setSelectedUsers((prevUser) => [...prevUser, user.id])
      }

      setSelected((prevSelected) => !prevSelected);
    }

    return (
        <div>
        ({users.map((user) => {
            return (
              <div className='userItem-wrapper' key={user[5]} onClick={() => handleSelect(user.id)} >
                <img src={user.photoURL || 'avatar.png'} size={32}/>
                <p>{user.displayName}</p>
              </div>
              // {selected ? (<img src='selected.png' />) : (<div className="emptySelected"></div>) }
            )
          })})
          {selected ? <img src='selected.png' /> : <div className="emptySelected"></div> }
        </div>  
    )
}

export default UserList;

//setSelectedUsers={setSelectedUsers} => add to div inside array.map()