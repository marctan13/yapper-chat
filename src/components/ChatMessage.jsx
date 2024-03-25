import Input from "./Input";
import Message from "./Message";
import { collection } from "firebase/firestore";
import { db } from "../firebase.js";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatMessage({ path }) {
  const query = collection(db, path);
  const [docs, loading, error] = useCollectionData(query);

  docs &&
    docs.map((doc) => {
      console.log(...doc);
    });
  return (
    <>
      <div className="chatMessages">
        {loading && <div>Loading</div>}
        {error && <div>error</div>}
        {/* {docs && docs.map((doc) => (
          <Message key={doc.id} {...doc}/>
        ))} */}
        <Message path={path} />
        <Input />
      </div>
    </>
  );
}

export default ChatMessage;