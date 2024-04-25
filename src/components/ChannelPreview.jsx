// import {useState, useEffect} from "react"
import { Trash } from "react-bootstrap-icons";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

function ChannelPreview(props) {
  const { user } = useAuth();
  // const [otherMemberDisplayName, setOtherMemberDisplayName] = useState(null)
// console.log("members: " + props.members)

  // useEffect(() => {
  //   console.log("Members:", props.members);
  //   // If it's a direct message and there are exactly two members
  //   if (!props.isChannel && props.members.length === 2) {
  //     const otherMember = props.members.find(member => member.uid !== user.uid);
  //     if (otherMember) {
  //       console.log("Other Member:", otherMember);
  //       setOtherMemberDisplayName(otherMember.displayName);
  //     }
  //   }
  // }, [props.isChannel, props.members, user.uid]);

  // console.log(otherMemberDisplayName + "Other display Name")

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
          <img src="/yapper-logo.jpg" className="channel-icon" alt="avatar" />
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
          {props.isChannel && <h3>{props.name}</h3>}
          {!props.isChannel && props.members.length === 2 && (
            <h3>
              {props.members.find((member) => member.uid !== user.uid)
                ?.displayName}
                {/* {otherMemberDisplayName} */}
            </h3>
          )}
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
