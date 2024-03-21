import { Trash } from "react-bootstrap-icons";

function ChannelPreview(props) {
  return (
    <div className="chatPreview">
      <div className="userChat">
        <img src="/avatar.png" alt="avatar" />
        <div key={props.key} className="name-chat">
          <h3>{props.name}</h3>
        </div>
        <span>
          <Trash style={{ height: "100%" }} size={35} />
        </span>
      </div>
    </div>
  );
}

export default ChannelPreview;
