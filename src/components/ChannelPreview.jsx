import { Trash } from "react-bootstrap-icons";
import { doc, deleteDoc, query, collection, where, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function ChannelPreview(props) {
  const [channel, setChannel] = useState({
    image: null,
    name: null,
  });
  const { user, getUserDocId } = useAuth();

  const handleDelete = async () => {
    try {
      console.log("deleting channel: ", props.id);
      if (confirm("Do you want to delete this channel?")) {
        const docRef = doc(db, "channels", props.id);
        await deleteDoc(docRef);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // changes DM image and name to match other user
  useEffect(() => {
    console.log(props.channel)
    if(!props.channel){// only run if channel is set to false
      try{
        const getMembers = async () => {
          const member = props.members.filter((user) => user != props.docId);// find docId of other user
          const userRef = doc(db, 'users', member[0]);// get other user's info from server
          const userSnap = await getDoc(userRef);
          let otherUser = userSnap.data();
          setChannel({
            image: otherUser.photoURL,
            name: otherUser.displayName,
          });
          return;
        }
        getMembers()
      } catch(err){
        console.error('Could not find member info');

      }
    } else {
      setChannel({
        image: props.image,
        name: props.name,
      })
    }
  }, []);

  return (
    <div
      onClick={() => props.onClick(props.id)}
      className={`chatPreview ${
        props.id === props.selectedChannel ? "selected" : ""
      }`}
    >
      <div className={`userChat ${props.id === props.selectedChannel ? "selectedChannel" : ""}`}>
        {channel.image != null && (
          <img src={channel.image} className="channel-icon" alt="avatar" />
        )}
<<<<<<< HEAD
        {!props.image && (
          <img src="/yapper-logo.jpg" className="channel-icon" alt="avatar" />
=======
        {channel.image == null && (
          <img src="/cup.jpg" className="channel-icon" alt="avatar" />
>>>>>>> d4becce915b2405b7b485de72e39914d292ca881
        )}
        <div className="name-chat">
          <h3>{channel.name}</h3>
        </div>

        <span className="deleteContainer">
          <Trash
            onClick={handleDelete} 
            style={{ height: "100%" }}
            size={35}
          />
        </span>
      </div>
    </div>
  );
}

export default ChannelPreview;
