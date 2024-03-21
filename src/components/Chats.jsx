import Header from "./Header";
import ChatMessage from "./ChatMessage";
import { db } from "../firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

function Chats() {
  const query = collection(db, "channels");
  const [docs, loading, error] = useCollectionData(query);
  return (
    <div className="rightSection">
      <Header />
      {docs &&
        docs.map((doc) => (
          <ChatMessage key={doc.id} path={`channels/${doc.name}/messages`} />
        ))}
    </div>
  );
}

export default Chats;
