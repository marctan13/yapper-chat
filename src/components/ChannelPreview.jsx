import { useState, useEffect } from "react";
import { Trash } from "react-bootstrap-icons";
import { doc, deleteDoc,getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";

function ChannelPreview(props) {
  const { user } = useAuth();
  // const [otherMemberDisplayName, setOtherMemberDisplayName] = useState(null)
  //returns document of membrers inside channel
  const { members } = useChat();

  const [otherMemberName, setOtherMemberName] = useState(null);

  // console.log(members)

  useEffect(() => {
    const fetchOtherMemberName = async () => {
      // if (props.dmMembers.length !== 2 || members.length === 0) {
      //   return;
      // }
      
      const otherMemberId = props.dmMembers.find(id => id !== user.uid);
      if (!otherMemberId) {
        return;
      }
  
      try {
        const userDocRef = doc(db, "users", otherMemberId);
        const userDocSnapshot = await getDoc(userDocRef);
        
        if (userDocSnapshot.exists()) {
          const otherMemberData = userDocSnapshot.data();
          setOtherMemberName(otherMemberData.displayName);
        } else {
          console.log("Other member document not found.");
        }
      } catch (error) {
        console.error("Error fetching other member document:", error);
      }
    };
  
    fetchOtherMemberName();
  }, [props.isChannel, props.dmMembers, user.uid, members]);

  console.log("Display Name" + otherMemberName)

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

  return (
    <div
      onClick={() => props.onClick(props.id)}
      className={`chatPreview ${
        props.id === props.selectedChannel ? "selected" : ""
      }`}
    >
      <div
        className={`userChat ${
          props.id === props.selectedChannel ? "selectedChannel" : ""
        }`}
      >
        {props.image && (
          <img src={props.image} className="channel-icon" alt="avatar" />
        )}
        {!props.image && (
          <img src="/cup.jpg" className="channel-icon" alt="avatar" />
        )}
        {/* {!props.isChannel && props.members.length === 2 && (
          <div className="name-chat">
            <h1>
              {
                props.members.find((member) => member.uid !== user.uid)
                  ?.displayName
              }
            </h1>
          </div>
        )}
        {props.isChannel && (
          <div className="name-chat">
            <h3>{props.name}</h3>
          </div>
        )} */}
        <div className="name-chat">
          {/* Display channel name for channels */}
          {props.isChannel && <h3>{props.name}</h3>}
          {/* <h3>{props.name}</h3> */}
          {/* Display the other member's name for DMs */}
          {!props.isChannel && props.dmMembers.length === 2 && (
            <h3>
              {otherMemberName}
            </h3>
          )}
        </div>

        <span className="deleteContainer">
          <Trash
            onClick={handleDelete} // Use handleDelete directly
            style={{ height: "100%" }}
            size={35}
          />
        </span>
      </div>
    </div>
  );
}

export default ChannelPreview;
